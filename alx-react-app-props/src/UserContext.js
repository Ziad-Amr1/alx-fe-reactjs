// alx-react-app-props/src/UserContext.js
import { createContext } from 'react';

// Create a UserContext with default dummy data
const UserContext = createContext({
  name: "Default Name",
  email: "default@example.com"
});

export default UserContext;