import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

import { auth } from './services/firebase'
import { User as FirebaseUser } from 'firebase/auth'

import Header from './Components/Header/Header';
import Main from './Pages/Main/Main';

import { User } from './types';


function App() {
  const [fbUser, setfbUser] = useState<FirebaseUser | null>(null)
  const [allUsers, setAllUsers] = useState<User[]>({} as User[])

  const [discogsToken, setDiscogsToken] = useState<string | null>(null)

  const URL = "http://localhost:4000/users/"
  const TOKEN_URL = "http://localhost:4000/discogstoken/"

  // console.log('./App token', discogsToken)
  // console.log('./App allusers', allUsers)

  // get discogs token
  const getDiscogsToken = async () => {
    const response = await fetch(TOKEN_URL)
    const data = await response.text()

    setDiscogsToken(data)
  }

  // get all users from MongoDB
  const getUsers = async (): Promise<void> => {
    const response = await fetch(URL)
    const data = await response.json()

    setAllUsers(data)
  }

  // create a user in MongoDB using Firebase login info
  const createUser: (fbUser: FirebaseUser | null) => Promise<void> = async (fbUser): Promise<void> => {

    // send a JWT from frontend to backend to access Firebase login info in backend/index.ts
    const token = await fbUser?.getIdToken()

    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        "Authorization": "Bearer " + token
      }
    })

    getUsers()
  }

  useEffect(() => {
    getDiscogsToken()
    getUsers()

    // onAuthStateChanged triggers when someone logs in or logs out
    const unsubscribe = auth.onAuthStateChanged(fbUser => {

      // set fbUser to logged in user upon login or null on logout
      setfbUser(fbUser)

      // createUser in MongoDB if user logged in
      if (fbUser) createUser(fbUser)
    })
    return unsubscribe
  }, [])

  return (
    <Container className="App">
      <Header
        getUsers={getUsers}
        fbUser={fbUser}
      />
      <Main
        allUsers={allUsers}
        fbUser={fbUser}
        discogsToken={discogsToken}
      />
    </Container>
  );
}

export default App;
