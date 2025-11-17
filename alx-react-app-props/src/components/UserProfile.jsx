import { useContext } from 'react';
import UserContext from '../UserContext';  // Correct path from components directory

function UserProfile() {
  const userData = useContext(UserContext);

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserProfile;
