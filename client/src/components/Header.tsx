import React, {useState,useEffect} from 'react'
import { NavBar } from './NavBar'


interface HeaderProps {
    isAuthenticated: Boolean,
    user: any,
    scores:[]|undefined
}

export const Header: React.FC<HeaderProps> = ({user,isAuthenticated, scores}) => {
        const [average, setAverage] = useState<number>()
        // calculate the average of the scores
        useEffect(() => {
            if (scores !== undefined){
                setAverage(scores?.reduce((partial_sum, a) => partial_sum + a, 0) / scores.length)
                
            }
        }, [scores])
        return (
            // display user's name and average words per minute
            <header>
                {isAuthenticated ? <h1>Hello, {user.name}</h1>: <h1>Welcome to Typing Test</h1>}
                {/* // round average to 2 decimal places */}
                {average !== undefined ? <h3>Average WPM: {(Math.round(average * 100) / 100)}</h3>: null}
                <NavBar isAuthenticated={isAuthenticated}/>
            </header>
        );
}