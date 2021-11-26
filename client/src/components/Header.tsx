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
            <header className="text-center">
                <NavBar isAuthenticated={isAuthenticated} user={user} average={average}/>
            </header>
        );
}