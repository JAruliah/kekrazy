import React from 'react'
import { NavBar } from './NavBar';


interface HeaderProps {
    isAuthenticated: Boolean,
    user: any,
    scores:[]|undefined
}

export const Header: React.FC<HeaderProps> = ({user,isAuthenticated}) => {
        return (
            <header>
                {isAuthenticated ? <h1>Hello, {user.name}</h1>: <h1>Welcome to Typing Test</h1>}
                <NavBar isAuthenticated={isAuthenticated}/>
            </header>
        );
}