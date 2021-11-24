import React, {useEffect, useState} from 'react'
import {Header} from '../components/Header'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

interface ScoreBoardProps {
    user:any,
    isAuthenticated: Boolean,
    scores: [] | undefined
}

interface User{
    email:string,
    userName:string,
    scores:[],
    accuracy:[]
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({user, isAuthenticated, scores}) => {
    const [allUsers, setAllUsers] = useState<User[]>()
    const [scoreBoard, setScoreBoard] = useState<{userName:string,average:number, accuracy:number, games:number}[]>([])

        // on mount and every time scores changes update state and set new scores
        useEffect(() => {
            let isMounted = true
        // calculate the average wpm for each user and set scorboard state
        // sort in descending order
            const getAverageWPM = () => {
                let userScores:{userName:string,average:number, accuracy:number, games:number}[] = []
                allUsers?.map(user => {
                    let average = 0
                    let sum = 0
                    let accuracyAverage = 0
                    let accuracySum = 0
                    user.scores.forEach(score => {
                        sum += score
                    })
                    user.accuracy.forEach(accuracy => {
                        accuracySum += accuracy
                    })
                    average = sum / user.scores.length
                    average = Math.round(average * 100) / 100
                    accuracyAverage = accuracySum / user.accuracy.length
                    return userScores.push({userName:user.userName, average:average, accuracy:accuracyAverage, games:user.scores.length})  
                })

                userScores.sort((a, b) => { 
                    return b.average -  a.average;
                })

                setScoreBoard(userScores)
            } //End of function

                if (isMounted){
                    fetch(`${process.env.REACT_APP_BASE_URL}scores`)
                    .then(res => res.json())
                    .then(data => {
                        setAllUsers(data)
                        getAverageWPM()
                    })
                    .catch(err => {console.log(err)})
                }

                return () => { isMounted = false };


            }, [scores, allUsers])

    return (
        <main>
            <Header user={user} isAuthenticated={isAuthenticated} scores={scores}/>
            <div>
                <h2 className="text-center mt-5 mb-3">Scoreboard</h2>
                <MDBTable>
                    <MDBTableHead light>
                        <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Username</th>
                        <th scope='col'>WPM</th>
                        <th scope='col'>Accuracy</th>
                        <th scope='col'>Games Played</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                    {
                    scoreBoard.map((user,index )=> {
                        return (
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td><p>{user.userName}</p></td>
                                <td><p>{user.average}</p></td>
                                <td><p>{Math.round(user.accuracy)}%</p></td>
                                <td><p>{user.games}</p></td>
                            </tr>
                        )
                    })
                    }
                    </MDBTableBody>
                </MDBTable>
            </div>
        </main>
    )
}