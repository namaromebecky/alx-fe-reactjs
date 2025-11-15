import UserProfile from './UserProfile';
import userContext from './userContext';

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    <userContext.Provider value={userData}>
      <UserProfile />
    </userContext.Provider>
  );
}

export default App;
