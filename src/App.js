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
import Finance from "./Pages/Finances/Finance";
import Login from "./Pages/Login/Login";
import Members from "./Pages/Members/Members";
import SetLists from "./Pages/SetLists/SetLists";
import Signup from "./Pages/Signup/Signup";
import Tasks from "./Pages/Tasks/Tasks";
import Loading from "./Components/Loading/Loading";

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

  const [currentUser, setCurrentUser] = useState();
  const [currentBand, setCurrentBand] = useState();

  //Is loading state
  const [isLoading, setIsLoading] = useState(true);

  //Using useEffect to check if the user is logged in
  useEffect(() => {
    //Checks if current user is logged in
    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
      //User is logged in
      if (user) {
        //Checks if user is in Firestore database
        utilities.doesUserExist(user.uid).then((userExists) => {
          //If user is not in database
          if (!userExists) {
            //Adds user to Firestore database
            utilities.addUser(user.uid, user.displayName);
          }
        });

        onSnapshot(doc(getFirestore(), "users", auth.currentUser.uid), () => {
          utilities.getUser(user.uid).then((user) => {
            setCurrentUser(user);
            if (!user.bandId) return;
            if (user.bandId.length > 0) {
              onSnapshot(doc(getFirestore(), "bands", user.bandId), (asd) => {
                utilities.getBand(user.bandId).then((band) => {
                  setCurrentBand(band);
                  setIsLoading(false);
                });
              });
            }
          });
        });

        //User is logged in
        setIsLoggedIn(true);
      } else {
        //User is not logged in
        setIsLoggedIn(false);
      }
    });
  }, []);

  if (isLoading) return <Loading />;

  if (isLoggedIn) {
    return (
      <Routes>
        <Route
          path="/"
          element={<Dashboard user={currentUser} band={currentBand} />}
        />
        <Route
          path="/bandchat"
          element={<BandChat user={currentUser} band={currentBand} />}
        />
        <Route
          path="/events"
          element={<Events user={currentUser} band={currentBand} />}
        />
        <Route
          path="/finances"
          element={<Finance user={currentUser} band={currentBand} />}
        />
        <Route
          path="/members"
          element={<Members user={currentUser} band={currentBand} />}
        />
        <Route
          path="/setlists"
          element={<SetLists user={currentUser} band={currentBand} />}
        />
        <Route
          path="/tasks"
          element={<Tasks user={currentUser} band={currentBand} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
