// src/contexts/UserProvider.tsx
// cambio *********************

import { FC, ReactNode } from 'react';
import { UserProvider } from './UserContext';

// Propiedades del componente de proveedor de usuario
interface UserProviderProps {
    children: ReactNode;
}

// Componente de proveedor de usuario
const AppUserProvider: FC<UserProviderProps> = ({ children }) => {
    return <UserProvider>{children}</UserProvider>;
};

export default AppUserProvider;
