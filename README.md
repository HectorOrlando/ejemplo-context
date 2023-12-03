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

Este es el flujo general de cómo se comunican las diferentes partes de la aplicación `Ejemplo Contex`
Vamos a dividirlo en secciones para entender mejor cada parte.

### 1. **Inicialización de la Aplicación (_app.tsx):**
   - Este archivo es el punto de entrada de tu aplicación Next.js.
   - Importa el componente `UserProvider` desde `@/context/UserProvider`.
   - Proporciona el proveedor de contexto `UserProvider` alrededor de todos los componentes de la aplicación. Esto asegura que el contexto de usuario esté disponible para todos los componentes.

### 2. **Componente de Página (index.tsx):**
   - Importa el hook `useUserContext` desde `'../context/UserContext'` para acceder al contexto de usuario.
   - Define el componente `Home`, que representa la página principal.
   - Utiliza el hook `useUserContext` para obtener el estado de usuarios (`users`) y las funciones (`deleteUserById` y `addUser`) desde el contexto.
   - Define las funciones `handleRemoveUser` y `handleAddUser` para manejar la eliminación y adición de usuarios, respectivamente.
   - Renderiza la lista de usuarios y botones para agregar/eliminar usuarios.

### 3. **Interfaces (user.ts):**
   - Define la interfaz `User` que representa la estructura de un usuario.
   - Define la interfaz `UserState` que representa el estado del contexto, con una lista de usuarios.
   - Define las acciones posibles mediante el type `UserAction`.

### 4. **Contexto de Usuario (UserContext.tsx):**
   - Importa `createContext` y `useContext` de React.
   - Define la interfaz `ContextProps` que especifica la forma del contexto (estado y funciones).
   - Crea el contexto de usuario utilizando `createContext`.
   - Define el hook `useUserContext` para acceder al contexto de usuario.

### 5. **Proveedor de Contexto (UserProvider.tsx):**
   - Importa `useReducer` y `useEffect` de React, además del reductor `userReducer` y el contexto `UserContext`.
   - Define el proveedor de contexto `UserProvider`.
   - Utiliza `useReducer` para gestionar el estado de usuarios.
   - Define las funciones `deleteUserById` y `addUser` que se proporcionarán en el contexto.
   - Utiliza `useEffect` para inicializar el contexto con una lista de usuarios al cargar la aplicación.

### 6. **Reductor de Usuario (userReducer.ts):**
   - Importa las interfaces `UserAction` y `UserState` de `'../interfaces/user'`.
   - Define el reductor `userReducer` que maneja las acciones y actualiza el estado del usuario en consecuencia.

En resumen, la aplicación utiliza el contexto de usuario para almacenar y gestionar el estado de los usuarios. Los componentes pueden acceder al contexto a través del hook `useUserContext` para interactuar con los usuarios, como agregar o eliminar usuarios. El reductor `userReducer` define cómo el estado debe actualizarse en respuesta a diferentes acciones.

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
|  |-- api
|  | |-- hello.ts
|  |-- _app.tsx
|  |-- _document.tsx
|  |-- index.tsx