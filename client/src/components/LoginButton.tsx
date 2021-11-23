import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import { MDBBtn } from 'mdb-react-ui-kit'


export const LoginButton: React.FC = () => {
    const {loginWithRedirect} = useAuth0()
        return (
            <MDBBtn onClick={() => loginWithRedirect()}>Login</MDBBtn>
        );
}