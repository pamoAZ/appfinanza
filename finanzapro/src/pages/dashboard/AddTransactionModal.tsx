import React, { useState } from 'react';
import { useUIStore } from '@/store/uiStore'; // Importa el estado global
import { useAuthStore } from '@/store/authStore';
import { Modal } from '../ui/Modal'; // Importa el componente base de UI
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { db } from '@/services/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const AddTransactionModal = () => {
  const { activeModal, closeModal } = useUIStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  // El modal solo se muestra si el estado global es 'addTransaction'
  const isOpen = activeModal === 'addTransaction';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para guardar en Firestore...
    closeModal();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={closeModal} 
      title="Nueva Transacción"
    >
      <form onSubmit={handleSubmit}>
        {/* Aquí van tus inputs de Monto y Categoría */}
        <Button type="submit" isLoading={loading}>Guardar</Button>
      </form>
    </Modal>
  );
};