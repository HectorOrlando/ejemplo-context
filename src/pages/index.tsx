// src/pages/index.tsx
import { useUserState, useUserDispatch } from '../context/UserContext';

const Home: React.FC = () => {
  const { users } = useUserState();
  const dispatch = useUserDispatch();

  const handleRemoveUser = (id: number) => {
    // Eliminar usuario del contexto
    dispatch({ type: 'REMOVE_USER', payload: { id } });
  };

  const handleAddUser = () => {
    // Agregar nuevo usuario al contexto
    const randomInt = (min:number, max:number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    const numRandom = randomInt(10, 100);
    const userNew = { id: numRandom, name: `name ${numRandom}` };
    dispatch({ type: 'ADD_USER', payload: userNew });
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}{' '}
            <button onClick={() => handleRemoveUser(user.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <hr/>
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default Home;
