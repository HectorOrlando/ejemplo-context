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