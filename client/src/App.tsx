import React, {useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react'
import { Main } from './pages/Main';
import { ScoreBoard } from './pages/ScoreBoard';
import { NotFound } from './pages/NotFound';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  const {user, isAuthenticated} = useAuth0()
  const [scores, setScores] = useState<[]>([])

  // get the scores of the user when logged in
  useEffect(() => {
    if (isAuthenticated){
      if (user !== undefined){

        fetch(`${process.env.REACT_APP_BASE_URL}`,{
          method:"POST",
          headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:user?.email, userName:user['https://myapp.example.com/username']})
        })
        .then(res => res.json())
        .then(data => {
          setScores(data[0].scores)
        })
        .catch(err => console.log(err))

      }
    }
  }, [isAuthenticated, user])

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path= '/' element={<Main scores={scores} user={user} setScores={setScores} isAuthenticated={isAuthenticated} userEmail={user?.email}/>}/> 
          <Route path='/scoreboard' element={<ScoreBoard user={user} isAuthenticated={isAuthenticated} scores={scores}/>} />
          <Route path="/*" element={<NotFound/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
