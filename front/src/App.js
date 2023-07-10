import React from 'react';
import LoginForm from './components/LoginForm';
import Rout from './components/Routes';
import { UserProvider } from './components/UserContext';

const App = () => {
  return (
    <UserProvider>
      <Rout/>
    </UserProvider>

  );
};

export default App;