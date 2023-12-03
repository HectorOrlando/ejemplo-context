// src/contexts/UserProvider.tsx

import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { userReducer } from './userReducer';
import { UserContext } from './UserContext';

// Proveedor del contexto de usuario
export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, { users: [] });

    const deleteUserById = (id: number) => {
        dispatch({ type: 'REMOVE_USER', payload: { id } });
    };

    const addUser = () => {
        // Agregar nuevo usuario al contexto
        const randomInt = (min: number, max: number) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const numRandom = randomInt(10, 100);
        const userNew = { id: numRandom, name: `name ${numRandom}` };

        dispatch({ type: 'ADD_USER', payload: userNew });
    }

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
        <UserContext.Provider value={{
            users: state,
            deleteUserById,
            addUser
        }}>
            {children}
        </UserContext.Provider>
    );
};
