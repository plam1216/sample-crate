import React from 'react'
import { User as FirebaseUser } from 'firebase/auth'
import { login, logout } from '../../services/firebase'

// import Nav from 'react-bootstrap/Nav'
// import Navbar from 'react-bootstrap/Navbar'
// import Container from 'react-bootstrap/Container'
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'

// type UserProps = {
// username: string,
// email: string,
// pfp: string,
// // playlist is an array of songs (objects)
// playlist: {
//     name: string,
//     album: string,
//     artist: string,
//     release_date: string,
//     duration: number,
// }[]
// }

type User = {
    user: FirebaseUser | null
}

const Header = ({ user }: User) => {
    console.log(user)
    return (
        <Navbar>
            <Container>
                <Navbar.Brand>Sample Crate</Navbar.Brand>
                <Nav>
                    {user ?
                        <>
                            <Nav.Link >Favorites</Nav.Link>
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                            {/* <Nav.Item >{user.displayName}</Nav.Item> */}
                        </>
                        :
                        <Nav.Link onClick={login}>Login</Nav.Link>
                    }
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header