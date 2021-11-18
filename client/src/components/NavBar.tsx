import React from 'react'
import { LoginButton } from './LoginButton'
import {LogoutButton} from './LogoutButton'

interface NavBarProps {
    isAuthenticated: Boolean
}

export const NavBar: React.FC<NavBarProps> = ({isAuthenticated}) => {
        return (
            <nav>
                {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </nav>
        );
}