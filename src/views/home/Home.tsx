// redux
import { useAppSelector } from '../../store/store';
// types
import Person from '../../types/person';

const Home = () => {
  const users = useAppSelector((state) => state.contacts);

  return (
    <>
      <h1>Bil Split</h1>
      <div>
        {users.map((user, index) => (
          <div key={index}>{user.name}</div>
        ))}
      </div>
    </>
  );
};

export default Home;
