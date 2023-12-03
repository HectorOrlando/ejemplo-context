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
