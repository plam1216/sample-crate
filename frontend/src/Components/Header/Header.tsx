import React from 'react'
import { User as FirebaseUser } from 'firebase/auth'
import { login, logout } from '../../services/firebase'

import { Nav, Navbar, Container } from 'react-bootstrap'
import { Google } from 'react-bootstrap-icons'

interface Props {
    fbUser: FirebaseUser | null
}

const Header = (props: Props) => {
    return (
        <Navbar style={{ backgroundColor: '#9EC6C2'}}>
            <Container>
                <Navbar.Brand>Sample Crate</Navbar.Brand>
                <Nav>
                    {props.fbUser ?
                        <>
                            <Nav.Link >Favorites</Nav.Link>
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        </>
                        :
                        <Nav.Link
                            onClick={() => login()}>
                            <Google size={20}></Google>
                            {/* Login */}
                        </Nav.Link>
                    }
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header