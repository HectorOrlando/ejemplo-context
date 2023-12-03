estos son los archivos de mi App:

/** pages ***/

// src/pages/_app.tsx

import { UserProvider } from '@/context/UserProvider';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

// src/pages/index.tsx
import { useUserContext } from '../context/UserContext';

const Home: React.FC = () => {
  const { users, deleteUserById } = useUserContext(); // Utilizamos el hook para acceder al contexto
  const { addUser } = useUserContext();
  const handleRemoveUser = (id: number) => {
    deleteUserById(id);
  };

  const handleAddUser = () => {
    addUser();
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.users.map(user => (
          <li key={user.id}>
            {user.name}{' '}
            <button onClick={() => handleRemoveUser(user.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <hr />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default Home;




/****** interfaces ****/

// src/interfaces/user.ts

// Definición del tipo de usuario
export interface User {
    id: number;
    name: string;
}

// Estado inicial del contexto
export interface UserState {
    users: User[];
}

// Acciones posibles
export type UserAction =
    | { type: 'ADD_USER'; payload: User }
    | { type: 'REMOVE_USER'; payload: { id: number } }
    | { type: 'SET_USERS'; payload: User[] };



/*** Context  ***/

// src/contexts/UserContext.tsx

import { createContext, useContext } from 'react';
import { UserState } from '../interfaces/user';

interface ContextProps {
    users: UserState;
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


// src/contexts/userReducer.ts

import { UserAction, UserState } from '../interfaces/user';

// Función reductora para manejar las acciones
export const userReducer = (state: UserState, action: UserAction): UserState => {
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
