import { createContext } from 'react';

// Create context with a default value
const UserContext = createContext({
  name: "",
  email: ""
});

export default UserContext;
