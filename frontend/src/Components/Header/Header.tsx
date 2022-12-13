import React from 'react'
import { User as FirebaseUser } from 'firebase/auth'
import { login, logout } from '../../services/firebase'

import { Nav, Navbar, Container } from 'react-bootstrap'

interface Props {
    fbUser: FirebaseUser | null
    getUsers: () => void
}

const Header = (props: Props) => {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand>Sample Crate</Navbar.Brand>
                <Nav>
                    {props.fbUser ?
                        <>
                            <Nav.Link >Favorites</Nav.Link>
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        </>
                        :
                        <Nav.Link onClick={() => {
                            login()
                        }}>Login</Nav.Link>
                    }
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header