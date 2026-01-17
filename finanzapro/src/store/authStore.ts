import { create } from 'zustand';
import { USE_MOCK_AUTH, auth, db } from '@/services/firebase/config';
import { User, UserSettings, Currency } from '@/types';
import { auth, db } from '../services/firebase/config';
import {  
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  updateProfile 
} from 'firebase/auth';

import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';

type FirebaseUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

// Mock user for development
const MOCK_USER: User = {
  uid: 'mock-user-123',
  email: 'demo@finanzapro.com',
  displayName: 'Usuario Demo',
  currency: 'COP',
  role: 'user',
  settings: {
    theme: 'system',
    notifications: true,
    language: 'es',
  },
  isActive: true,
  createdAt: new Date(),
  lastLogin: new Date(),
};



interface AuthState {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  
  // Actions
  initialize: () => () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  updateUserSettings: (settings: Partial<UserSettings>) => Promise<void>;
  updateCurrency: (currency: Currency) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  firebaseUser: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
  
  initialize: () => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            
            // Update last login
            await updateDoc(doc(db, 'users', firebaseUser.uid), {
              lastLogin: serverTimestamp(),
            });
            
            set({
              user: userData,
              firebaseUser,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            // User document doesn't exist, create it
            const newUser: Omit<User, 'createdAt' | 'lastLogin'> & { createdAt: ReturnType<typeof serverTimestamp>; lastLogin: ReturnType<typeof serverTimestamp> } = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || 'Usuario',
              photoURL: firebaseUser.photoURL || undefined,
              currency: 'COP',
              role: 'user',
              settings: {
                theme: 'system',
                notifications: true,
                language: 'es',
              },
              isActive: true,
              createdAt: serverTimestamp(),
              lastLogin: serverTimestamp(),
            };
            
            await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
            
            set({
              user: newUser as unknown as User,
              firebaseUser,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          set({
            user: null,
            firebaseUser: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'Error al cargar datos del usuario',
          });
        }
      } else {
        set({
          user: null,
          firebaseUser: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    });
    
    return unsubscribe;
  },
  
login: async (email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // El estado del usuario se actualizará por onAuthStateChanged
    } catch (error: unknown) {
      const errorMessage = getAuthErrorMessage(error);
      set({ isLoading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },
  
  register: async (email, password, displayName) => {
    set({ isLoading: true, error: null });
    
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name in Firebase Auth
      await updateProfile(firebaseUser, { displayName });
      
      // Create user document in Firestore
      const newUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName,
        currency: 'COP',
        role: 'user',
        settings: {
          theme: 'system',
          notifications: true,
          language: 'es',
        },
        isActive: true,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
      // User state will be updated by onAuthStateChanged
    } catch (error: unknown) {
      const errorMessage = getAuthErrorMessage(error);
      set({ isLoading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },
  
  logout: async () => {
    set({ isLoading: true, error: null });
    
    try {
      await signOut(auth);
      set({
        user: null,
        firebaseUser: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error: unknown) {
      const errorMessage = getAuthErrorMessage(error);
      set({ isLoading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },
  
  resetPassword: async (email) => {
    set({ isLoading: true, error: null });
    
    try {
      await sendPasswordResetEmail(auth, email);
      set({ isLoading: false });
    } catch (error: unknown) {
      const errorMessage = getAuthErrorMessage(error);
      set({ isLoading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },
  
  updateUserProfile: async (data) => {
    const { user, firebaseUser } = get();
    if (!user || !firebaseUser) return;
    
    set({ isLoading: true, error: null });
    
    try {
      // Update Firebase Auth profile if displayName or photoURL changed
      if (data.displayName || data.photoURL) {
        await updateProfile(firebaseUser, {
          displayName: data.displayName || firebaseUser.displayName,
          photoURL: data.photoURL || firebaseUser.photoURL,
        });
      }
      
      // Update Firestore document
      await updateDoc(doc(db, 'users', user.uid), {
        ...data,
        updatedAt: serverTimestamp(),
      });
      
      set({
        user: { ...user, ...data },
        isLoading: false,
      });
    } catch (error: unknown) {
      const errorMessage = getAuthErrorMessage(error);
      set({ isLoading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },
  
  updateUserSettings: async (settings) => {
    const { user } = get();
    if (!user) return;
    
    set({ isLoading: true, error: null });
    
    try {
      const newSettings = { ...user.settings, ...settings };
      
      await updateDoc(doc(db, 'users', user.uid), {
        settings: newSettings,
        updatedAt: serverTimestamp(),
      });
      
      set({
        user: { ...user, settings: newSettings },
        isLoading: false,
      });
    } catch (error: unknown) {
      const errorMessage = getAuthErrorMessage(error);
      set({ isLoading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },
  
  updateCurrency: async (currency) => {
    const { user } = get();
    if (!user) return;
    
    set({ isLoading: true, error: null });
    
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        currency,
        updatedAt: serverTimestamp(),
      });
      
      set({
        user: { ...user, currency },
        isLoading: false,
      });
    } catch (error: unknown) {
      const errorMessage = getAuthErrorMessage(error);
      set({ isLoading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },
  
  clearError: () => set({ error: null }),
}));

// Helper function to get user-friendly error messages
function getAuthErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as { code: string }).code;
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Este correo electrónico ya está registrado';
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido';
      case 'auth/operation-not-allowed':
        return 'Operación no permitida';
      case 'auth/weak-password':
        return 'La contraseña es muy débil. Usa al menos 8 caracteres';
      case 'auth/user-disabled':
        return 'Esta cuenta ha sido deshabilitada';
      case 'auth/user-not-found':
        return 'No existe una cuenta con este correo electrónico';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      case 'auth/invalid-credential':
        return 'Credenciales inválidas. Verifica tu correo y contraseña';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Intenta más tarde';
      case 'auth/network-request-failed':
        return 'Error de conexión. Verifica tu internet';
      default:
        return 'Ha ocurrido un error. Intenta de nuevo';
    }
  }
  return 'Ha ocurrido un error inesperado';
}

// Selector hooks for common use cases
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useIsAdmin = () => useAuthStore((state) => state.user?.role === 'admin');
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
