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
