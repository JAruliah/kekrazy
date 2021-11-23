import React, {useEffect, useState} from 'react'
import {Header} from '../components/Header'

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
    const [scoreBoard, setScoreBoard] = useState<{userName:string,average:number, accuracy:number}[]>([])

        // on mount and every time scores changes update state and set new scores
        useEffect(() => {
            let isMounted = true
        // calculate the average wpm for each user and set scorboard state
        // sort in descending order
            const getAverageWPM = () => {
                let userScores:{userName:string,average:number, accuracy:number}[] = []
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
                    return userScores.push({userName:user.userName, average:average, accuracy:accuracyAverage})  
                })
                userScores.sort((a, b) => { 
                    return b.average -  a.average;
                })// end of function

                setScoreBoard(userScores)
            }

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
        <div>
            <Header user={user} isAuthenticated={isAuthenticated} scores={scores}/>
            <div>
                <h2 className="text-center mt-5 mb-3">Scoreboard</h2>
                {
                    scoreBoard.map((user,index )=> {
                        return <div key={index} className="d-flex" style={{justifyContent:"space-evenly"}}>
                            <div>
                                <p>Rank</p>
                                <p>{index}</p>
                            </div>
                            <div>
                                <p>Name</p>
                                <p>{user.userName}</p>
                            </div>
                            <div>
                                <p>WPM</p>
                                <p>{user.average}</p>
                            </div>
                            <div>
                                <p>Accuracy</p>
                                <p>{Math.round(user.accuracy)}%</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
        );
}