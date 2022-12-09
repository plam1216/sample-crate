import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { auth } from './services/firebase'
import { User as FirebaseUser } from 'firebase/auth'

import Header from './Components/Header/Header';
import { Container } from 'react-bootstrap';

function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  // console.log(user)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => setUser(user))

    return unsubscribe
  }, [])

  // let songs = [
  //   {
  //     name: "Sorry",
  //     album: "Purpose",
  //     artist: "Justin Bieber",
  //     release_date: "2015-2-2",
  //     duration: 20000
  //   }
  // ]

  return (
    <Container className="App">
      <Header
        user={user}
      />
    </Container>
  );
}

export default App;
