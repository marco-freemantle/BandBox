import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { initializeApp } from "firebase/app";
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { Routes, Route } from "react-router-dom";
import * as utilities from "./Utilities/FireStoreUtilities";
import Dashboard from "./Pages/Dashboard/Dashboard";
import BandChat from "./Pages/BandChat/BandChat";
import Events from "./Pages/Events/Events";
import Finances from "./Pages/Finances/Finances";
import Login from "./Pages/Login/Login";
import Members from "./Pages/Members/Members";
import SetLists from "./Pages/SetLists/SetLists";
import Signup from "./Pages/Signup/Signup";
import Tasks from "./Pages/Tasks/Tasks";

const firebaseConfig = {
  apiKey: "AIzaSyCbx3bBl0D0qR4I5M4h3KKqkIVNyFmn-OM",
  authDomain: "bandbox-a571b.firebaseapp.com",
  projectId: "bandbox-a571b",
  storageBucket: "bandbox-a571b.appspot.com",
  messagingSenderId: "487581324812",
  appId: "1:487581324812:web:eb64ee677a66913fd90029",
  measurementId: "G-TTYERMH7K4",
};

//Initialise firebase application
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);

function App() {
  //Is the user currently logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Using useEffect to check if the user is logged in
  useEffect(() => {
    //Checks if current user is logged in
    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
      //User is logged in
      if (user) {
        //Checks if user is in Firestore database
        utilities.getUser(user.uid).then((userExists) => {
          //If user is not in database
          if (!userExists) {
            //Adds user to Firestore database
            utilities.addUser(user.uid, user.displayName);
          }
        });

        //User is logged in
        setIsLoggedIn(true);
      } else {
        //User is not logged in
        setIsLoggedIn(false);
      }
    });
  }, []);

  if (isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/bandchat" element={<BandChat />} />
        <Route path="/events" element={<Events />} />
        <Route path="/finances" element={<Finances />} />
        <Route path="/login" element={<Login />} />
        <Route path="/members" element={<Members />} />
        <Route path="/setlists" element={<SetLists />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/**Redirect user to login page if trying to access resitricted content */}
        <Route path="/" element={<Login />} />
        <Route path="/bandchat" element={<Login />} />
        <Route path="/events" element={<Login />} />
        <Route path="/finances" element={<Login />} />
        <Route path="/members" element={<Login />} />
        <Route path="/setlists" element={<Login />} />
        <Route path="/tasks" element={<Login />} />
      </Routes>
    );
  }
}

export default App;
