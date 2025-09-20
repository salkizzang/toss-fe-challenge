import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { FormData } from '../types/form';

interface ModalContextType {
  isOpen: boolean;
  openModal: (callback: (result: FormData | null) => void) => void;
  closeModal: (result: FormData | null) => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [callback, setCallback] = useState<((value: FormData | null) => void) | null>(null);

  const openModal = (resultCallback: (result: FormData | null) => void) => {
    setCallback(() => resultCallback);
    setIsOpen(true);
  };

  const closeModal = (result: FormData | null) => {
    setIsOpen(false);
    if (callback) {
      callback(result);
      setCallback(null);
    }
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal Provider 안에서만 사용.');
  }
  return context;
};