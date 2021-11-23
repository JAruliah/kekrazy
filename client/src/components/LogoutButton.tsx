import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import { MDBBtn } from 'mdb-react-ui-kit'


export const LogoutButton: React.FC= () => {
    const {logout} = useAuth0()
        return (
            <MDBBtn onClick={() => logout()}>Logout</MDBBtn>
        );
}