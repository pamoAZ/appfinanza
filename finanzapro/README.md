# FinanzaPro 💰

Una aplicación web moderna de finanzas personales construida con React, TypeScript, y Firebase.

## 🚀 Características

- **Dashboard Interactivo**: Visualiza tu balance, ingresos y gastos del mes
- **Gestión de Transacciones**: CRUD completo para ingresos y gastos
- **Categorías Dinámicas**: Sistema jerárquico de categorías y subcategorías
- **Gráficos Visuales**: Donut chart para gastos por categoría, línea para evolución del ahorro
- **Dark Mode**: Tema oscuro de alta calidad
- **Responsive Design**: Optimizado para móvil y escritorio
- **Panel de Administración**: Métricas globales y gestión de usuarios (solo admin)

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + Vite 5 + TypeScript
- **Estilos**: Tailwind CSS 3.4 + Glassmorphism
- **Animaciones**: Framer Motion
- **Estado Global**: Zustand
- **Backend/Auth**: Firebase (Firestore + Auth)
- **Gráficos**: Recharts
- **Iconos**: Lucide React
- **Formularios**: React Hook Form + Zod

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd finanzapro
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env
```

4. Edita `.env` con tus credenciales de Firebase:
```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

5. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la build de producción
- `npm run lint` - Ejecuta el linter

## 📁 Estructura del Proyecto

```
finanzapro/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/           # Componentes base reutilizables
│   │   ├── layout/       # Componentes de estructura
│   │   ├── charts/       # Componentes de gráficos
│   │   └── forms/        # Formularios específicos
│   ├── pages/
│   │   ├── auth/         # Login, Register
│   │   ├── dashboard/    # Dashboard principal
│   │   └── admin/        # Panel de administración
│   ├── store/            # Zustand stores
│   ├── services/         # Firebase y API
│   ├── types/            # TypeScript types
│   ├── utils/            # Helpers y constantes
│   └── styles/           # CSS global
├── .env.example
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## 🔐 Configuración de Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita Authentication con Email/Password
3. Crea una base de datos Firestore
4. Copia las credenciales a tu archivo `.env`

### Estructura de Firestore

```
users/
  {uid}/
    - email
    - displayName
    - currency
    - role ('user' | 'admin')
    - settings
    - createdAt
    - lastLogin

transactions/
  {id}/
    - userId
    - type ('income' | 'expense')
    - productName
    - amount
    - date
    - categoryId
    - subcategoryId
    - notes
    - createdAt

categories/
  {id}/
    - userId (null = default)
    - name
    - icon
    - color
    - type
    - isDefault
    - subcategories/ (subcolección)
```

### Asignar rol de Admin

Para hacer un usuario administrador:
1. Ve a Firebase Console > Firestore
2. Encuentra el documento del usuario en `users/{uid}`
3. Cambia el campo `role` de `user` a `admin`

## 🎨 Personalización

### Colores

Edita `tailwind.config.js` para cambiar la paleta de colores:

```js
colors: {
  primary: {
    500: '#6366F1', // Color principal
    // ...
  }
}
```

### Categorías Predeterminadas

Edita `src/utils/constants.ts` para modificar las categorías por defecto.

## 📱 Responsive Design

- **Mobile** (< 768px): Bottom navigation
- **Tablet** (768px - 1024px): Sidebar colapsable
- **Desktop** (> 1024px): Sidebar expandido

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push

### Build Manual

```bash
npm run build
```

Los archivos de producción estarán en `dist/`.

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

---

Desarrollado con ❤️ usando React y Firebase
