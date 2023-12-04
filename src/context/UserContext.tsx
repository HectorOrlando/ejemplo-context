// src/contexts/UserContext.tsx

import { createContext, useContext } from 'react';
import { UserState } from '../interfaces/user';

interface ContextProps {
    // Estados
    users: UserState;
    // Métodos
    deleteUserById: (id: number) => void;
    addUser: () => void;
}

// Contexto del estado de usuario
export const UserContext = createContext<ContextProps | undefined>(undefined);

// Hook para acceder al contexto de usuario
export const useUserContext = (): ContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
