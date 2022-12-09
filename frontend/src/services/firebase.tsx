import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDpnb_xxLVrTB8g19YyL9F4GtJ2b7C7dB0",
    authDomain: "sample-crate.firebaseapp.com",
    projectId: "sample-crate",
    storageBucket: "sample-crate.appspot.com",
    messagingSenderId: "91832956978",
    appId: "1:91832956978:web:9580890e78f1c71a60642b",
    measurementId: "G-0ZRGE67MYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const login = () => {
    signInWithPopup(auth, provider)
}

const logout = () => {
    const auth = getAuth();
    signOut(auth)
}

export {
    login, logout, auth
}