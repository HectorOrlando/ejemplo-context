// src/contexts/UserContext.tsx
// cambio *********************

import { createContext, useReducer, useContext, ReactNode, Dispatch, useEffect } from 'react';

// Definición del tipo de usuario
export type User = {
    id: number;
    name: string;
};

// Estado inicial del contexto
export type UserState = {
    users: User[];
};

// Acciones posibles
export type UserAction =
    | { type: 'ADD_USER'; payload: User }
    | { type: 'REMOVE_USER'; payload: { id: number } }
    | { type: 'SET_USERS'; payload: User[] };

// Dispatch personalizado para las acciones
export type UserDispatch = Dispatch<UserAction>;

// Contexto del estado de usuario
const UserStateContext = createContext<UserState | undefined>(undefined);

// Contexto del dispatch de usuario
const UserDispatchContext = createContext<UserDispatch | undefined>(undefined);

// Función reductora para manejar las acciones
const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case 'ADD_USER':
            return { users: [...state.users, action.payload] };
        case 'REMOVE_USER':
            return { users: state.users.filter(user => user.id !== action.payload.id) };
        case 'SET_USERS':
            return { users: action.payload };
        default:
            return state;
    }
};

// Proveedor del contexto de usuario
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, { users: [] });

    // Agregar listaUsuario al contexto al inicializar
    useEffect(() => {
        const listaUsuario = [
            { id: 1, name: 'name 1' },
            { id: 2, name: 'name 2' },
            { id: 3, name: 'name 3' },
            { id: 4, name: 'name 4' },
            { id: 5, name: 'name 5' },
        ];

        dispatch({ type: 'SET_USERS', payload: listaUsuario });
    }, []);

    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
};

// Hook para acceder al estado de usuario
export const useUserState = (): UserState => {
    const context = useContext(UserStateContext);
    if (context === undefined) {
        throw new Error('useUserState must be used within a UserProvider');
    }
    return context;
};

// Hook para acceder al dispatch de usuario
export const useUserDispatch = (): UserDispatch => {
    const context = useContext(UserDispatchContext);
    if (context === undefined) {
        throw new Error('useUserDispatch must be used within a UserProvider');
    }
    return context;
};
