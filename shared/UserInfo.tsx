import { useSelector } from 'react-redux';
import { selectUser } from '../redux/selectors/authSelectors';

const UserInfo = () => {
    const user = useSelector(selectUser);

    if (!user) {
      return <p>No user is logged in</p>;
    }
    console.log({user})
    return (
      <div>
        <h1>Welcome, {user.name}!</h1>
        <p>Role: {user.role}</p>
      </div>
    );
}

export default UserInfo;
