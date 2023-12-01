// src/contexts/userReducer.ts
// cambio *********************

import { UserState, UserAction } from './UserContext';

// Función reductora para manejar las acciones
const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case 'ADD_USER':
            return { users: [...state.users, action.payload] };
        case 'REMOVE_USER':
            return { users: state.users.filter(user => user.id !== action.payload.id) };
        default:
            return state;
    }
};

export default userReducer;
