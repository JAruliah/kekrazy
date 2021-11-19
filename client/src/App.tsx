import React, {useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react'
import { Header } from './components/Header';
import { Main } from './components/Main';

function App() {
  const {user, isAuthenticated} = useAuth0()
  const [scores, setScores] = useState()

  // get the scores of the user when logged in
  useEffect(() => {
    if (isAuthenticated){
      fetch(`${process.env.REACT_APP_BASE_URL}${user?.email}`)
      .then(res => res.json())
      .then(data => {
        setScores(data[0].scores)
      })
      .catch(err => console.log(err))
    }
  }, [isAuthenticated, user])

  return (
    <div className="container">
        <Header user={user} isAuthenticated={isAuthenticated} scores={scores}/>
        <Main setScores={setScores} isAuthenticated={isAuthenticated} userEmail={user?.email}/>
    </div>
  );
}

export default App;
