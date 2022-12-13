import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { auth } from './services/firebase'
import { User as FirebaseUser } from 'firebase/auth'

import Header from './Components/Header/Header';
import { Container } from 'react-bootstrap';

interface Song {
  name: string
  album: string
  artist: string
  release_date: string
  duration: number
}

interface User extends Document {
  username?: string
  email: string
  pfp?: string
  playlist?: Song[]
}

function App() {
  const [fbUser, setfbUser] = useState<FirebaseUser | null>(null)
  const [dbUser, setdbUser] = useState<User | null>(null)

  // console.log(fbUser)
  // console.log("MongoDB", dbUser)

  const URL = "http://localhost:4000/users/"

  // get all users from MongoDB
  const getUsers = async () => {
    const response = await fetch(URL)

    const data = await response.json()

    setdbUser(data)
  }

  // create a user in MongoDB using Firebase login info
  const createUser: (fbUser: FirebaseUser | null) => Promise<void> = async (fbUser) => {
    // send a JWT from frontend to backend to access Firebase login info in backend
    // see index.ts line 31
    const token = await fbUser?.getIdToken()
    // console.log(token)

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
    getUsers()

    // onAuthStateChanged triggers when someone logs in or logs out
    const unsubscribe = auth.onAuthStateChanged(fbUser => {
      // set fbUser to logged in user upon login or null if logging out
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
    </Container>
  );
}

export default App;
