import React from 'react';
import { LoginButton } from './components/LoginButton';
import {LogoutButton} from './components/LogoutButton'
import {useAuth0} from '@auth0/auth0-react'

function App() {
  const {user, isAuthenticated} = useAuth0()
  return (
    <div>
          {isAuthenticated? <div><p>Logged in</p><p>{user?.email}</p></div>: <p>Not logged in</p>}
      <LoginButton />
      <LogoutButton />
    </div>
  );
}

export default App;
