import React, {useState} from 'react'
import { LoginButton } from './LoginButton'
import {LogoutButton} from './LogoutButton'
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse
  } from 'mdb-react-ui-kit';



interface NavBarProps {
    isAuthenticated: Boolean,
    user:any,
    average:any
}

export const NavBar: React.FC<NavBarProps> = ({isAuthenticated, user, average}) => {
    const [showNavColorThird, setShowNavColorThird] = useState(false)
        return (
            <MDBNavbar expand='lg' light style={{ backgroundColor: '#e3f2fd' }}>
            <MDBContainer fluid>
              <MDBNavbarBrand href='/'><img src="/img/typing.png" width="50" alt="typing logo"/></MDBNavbarBrand>
              <MDBNavbarToggler
                type='button'
                data-target='#navbarColor02'
                aria-controls='navbarColor02'
                aria-expanded='false'
                aria-label='Toggle navigation'
                onClick={() => setShowNavColorThird(!showNavColorThird)}
              >
                <MDBIcon icon='bars' fas />
              </MDBNavbarToggler>
              <MDBCollapse show={showNavColorThird} navbar>
                <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
                  <MDBNavbarItem className='active my-auto'>
                    <MDBNavbarLink aria-current='page' href='/'>
                      Type!
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem className="my-auto">
                  <MDBNavbarLink aria-current='page' href='/scoreboard'>Scoreboard</MDBNavbarLink>
                  </MDBNavbarItem>
                    {user!== undefined? <MDBNavbarItem className="ms-auto">
                        <div className="mx-4">
                            <h4 className="my-auto">{user['https://myapp.example.com/username']}</h4>
                            {isNaN(average) ? <p className="my-auto">Average WPM: 0</p>:<p className="my-auto">Average WPM: {Math.round(average)}</p>}
                        </div>
                        
                    </MDBNavbarItem>
                            
                        : 
                    null}
                    {/* If the user is undefined, have the login button pushed to the right */}
                    {user!== undefined?
                        <div>
                            {isAuthenticated ? <LogoutButton/>:<LoginButton />}
                        </div>
                    :
                        <div className="ms-auto">
                            {isAuthenticated ? <LogoutButton/>:<LoginButton />}
                        </div>
                    }

                </MDBNavbarNav>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>

        );
}