import React, {useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react'
import { Main } from './pages/Main';
import { ScoreBoard } from './pages/ScoreBoard';
import { NotFound } from './pages/NotFound';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  const {user, isAuthenticated} = useAuth0()
  const [scores, setScores] = useState()
  const [accuracy, setAccuracy] = useState()

  // get the scores of the user when logged in
  useEffect(() => {
    if (isAuthenticated){
      fetch(`${process.env.REACT_APP_BASE_URL}`,{
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:user?.email, firstName:user?.given_name, lastName:user?.family_name})
      })
      .then(res => res.json())
      .then(data => {
        setScores(data[0].scores)
        setAccuracy(data[0].accuracy)
      })
      .catch(err => console.log(err))
    }
  }, [isAuthenticated, user])

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path= '/' element={<Main accuracy={accuracy} setAccuracy={setAccuracy} scores={scores} user={user} setScores={setScores} isAuthenticated={isAuthenticated} userEmail={user?.email}/>}/> 
          <Route path='/scoreboard' element={<ScoreBoard user={user} isAuthenticated={isAuthenticated} scores={scores}/>} />
          <Route path="/*" element={<NotFound/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
