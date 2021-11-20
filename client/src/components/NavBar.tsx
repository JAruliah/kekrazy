import React from 'react'
import { LoginButton } from './LoginButton'
import {LogoutButton} from './LogoutButton'
import {Link} from 'react-router-dom'

interface NavBarProps {
    isAuthenticated: Boolean
}

export const NavBar: React.FC<NavBarProps> = ({isAuthenticated}) => {
        return (
            <nav className="d-flex justify-content-between">
                <Link to="/scoreboard">Scoreboard</Link>
                <Link to="/">Home</Link>
                {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </nav>
        );
}