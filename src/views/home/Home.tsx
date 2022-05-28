// redux
import { useAppSelector } from '../../store/store';
// types
import Person from '../../types/user';

const Home = () => {
  const users = useAppSelector((state) => state.contacts);

  return (
    <>
      <h1>Bil Split</h1>
      <hr />
      <a href="/split">New Split</a>
      <br />
      <div>
        {users.map((user, index) => (
          <div key={index}>{user.name}</div>
        ))}
      </div>
    </>
  );
};

export default Home;
