# Ejemplo Context


Pasos para arrancar un proyecto clonado desde GitHub:

1. **Clonar el repositorio:**

   ```bash
   git@github.com:HectorOrlando/ejemplo-context.git
   ```

   

2. **Navegar al directorio del proyecto:**

   ```bash
   cd ejemplo-context
   ```

3. **Instalar dependencias:**

   ```bash
   npm install
   ```

   Esto instalará todas las dependencias necesarias que están definidas en el archivo `package.json`.


4. **Compilar el código TypeScript:**

   ```bash
   npm run build
   ```

   Esto compilará el código TypeScript y generará los archivos JavaScript en el directorio `dist/`.

5. **Iniciar la aplicación:**

   ```bash
   npm start
   ```

   Esto arrancará la aplicación con Node.js, utilizando los archivos JavaScript generados en el paso anterior.

   O, si prefieres utilizar nodemon en modo de desarrollo:

   ```bash
   npm run dev
   ```

   Esto arrancará la aplicación con nodemon, lo que reiniciará automáticamente la aplicación cuando detecte cambios en los archivos.

6. **Acceder a la aplicación:**

   Abre tu navegador y accede a la aplicación a través de la URL 
   ```bash
   http://localhost:3000/
   ```

7. **Probar la aplicación:**

   Realiza pruebas en las rutas y funcionalidades de tu aplicación para asegurarte de que todo funcione como se espera.

Estos pasos deberían proporcionarte una guía básica para arrancar un proyecto clonado. Asegúrate de revisar el archivo `package.json` del proyecto clonado para conocer cualquier configuración específica de scripts o dependencias. Además, ten en cuenta que estos pasos pueden variar ligeramente dependiendo de la configuración específica del proyecto.


---
---

Puedes seguir estos pasos en un orden lógico para desarrollar la funcionalidad de tu aplicación utilizando el patrón Context y Reducer en React:

1. **src/interfaces/user.ts:**
   - Comienza definiendo las interfaces que representarán tu modelo de datos. En este caso, la interfaz `User` y `UserState`.

```typescript
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
```

2. **src/contexts/userReducer.ts:**
   - Luego, crea el reductor (`userReducer`) que manejará las acciones para actualizar el estado de usuario.

```typescript
// src/contexts/userReducer.ts

import { UserAction, UserState } from '../interfaces/user';

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
```

3. **src/contexts/UserContext.tsx:**
   - Ahora, crea el contexto (`UserContext`) que se utilizará para proporcionar el estado global a los componentes de tu aplicación.

```typescript
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
```

4. **src/contexts/UserProvider.tsx:**
   - Después, implementa el proveedor de contexto (`UserProvider`) que utilizará el reductor y proporcionará las funciones para interactuar con el estado global.

```typescript
// src/contexts/UserProvider.tsx

import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { userReducer } from './userReducer';
import { UserContext } from './UserContext';

// Proveedor del contexto de usuario
export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
    // Aquí se usa el useReducer para inicializar tu estado y obtener la función dispatch
    const [state, dispatch] = useReducer(userReducer, { users: [] });

    // Define las funciones deleteUserById y addUser que se proporcionarán en el contexto.

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
            // Estados
            users: state,
            // Métodos
            deleteUserById,
            addUser
        }}>
            {children}
        </UserContext.Provider>
    );
};

```

5. **src/pages/_app.tsx:**
   - En el componente _app.tsx, importa y utiliza el UserProvider para envolver la aplicación y proporcionar el contexto a todos los componentes.

```typescript
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
```

6. **src/pages/index.tsx:**
   - En la página principal, importa el hook useUserContext y utiliza el contexto para obtener y manipular el estado de usuarios.

```typescript
// src/pages/index.tsx
import { useUserContext } from '../context/UserContext';

const Home: React.FC = () => {
  const { users, deleteUserById, addUser } = useUserContext(); // Utilizamos el hook para acceder al contexto
  
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

```

Este orden te ayudará a construir de manera progresiva tu aplicación, asegurándote de que los elementos clave, como las interfaces, el reductor, el contexto y el proveedor, estén en su lugar antes de utilizarlos en las páginas de tu aplicación.

Estos pasos te permitirán construir la estructura básica del patrón Context y Reducer para tu aplicación de CRUD.

--- 

# Estructura del Ejemplo Context

```bash
src
|-- context
|  |-- UserContext.tsx
|  |-- UserProvider.tsx
|  |-- userReducer.ts
|-- interfaces
|  |-- user.ts
|-- pages
|  |-- _app.tsx
|  |-- _document.tsx
|  |-- index.tsx

```