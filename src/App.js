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
initializeApp(firebaseConfig);

function App() {
  //Is the user currently logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Current user object retrieved from firestore
  const [currentUser, setCurrentUser] = useState();
  //Current band object retrieved from firestore
  const [currentBand, setCurrentBand] = useState();

  //The current bandId selected from the dropdown in navigation bar
  const [currentBandId, setCurrentBandId] = useState();

  //Is loading state
  const [isLoading, setIsLoading] = useState(true);

  //Firestore auth
  const auth = getAuth();

  //Using useEffect to check if the user is logged in
  useEffect(() => {
    //Checks if current user is logged in
    auth.onAuthStateChanged((user) => {
      //User is logged in
      if (user) {
        //Checks if user is in Firestore database
        utilities.doesUserExist(user.uid).then((userExists) => {
          //If user is not in database
          if (!userExists) {
            //Adds user to Firestore database
            utilities.addUser(user.uid);
          }
        });

        onSnapshot(doc(getFirestore(), "users", auth.currentUser.uid), () => {
          utilities.getUser(user.uid).then((user) => {
            setCurrentUser(user);
            setIsLoading(false);
            if (!user.bands) return;
            if (user.bands.length > 0) {
              setCurrentBandId(user.bands[0].bandId);
            }
          });
        });

        //User is logged in
        setIsLoggedIn(true);
      } else {
        //User is not logged in
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentBandId) {
      onSnapshot(doc(getFirestore(), "bands", currentBandId), (doc) => {
        utilities.getBand(currentBandId).then((band) => {
          setCurrentBand(band);
        });
      });
    }
  }, [currentBandId]);

  if (isLoading) return <Loading />;

  function setBand(bandId) {
    setCurrentBandId(bandId);
  }

  if (isLoggedIn) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              user={currentUser}
              band={currentBand}
              bandId={currentBandId}
              setSelectedBand={setBand}
            />
          }
        />
        <Route
          path="/bandchat"
          element={
            <BandChat
              user={currentUser}
              band={currentBand}
              bandId={currentBandId}
              setSelectedBand={setBand}
            />
          }
        />
        <Route
          path="/events"
          element={
            <Events
              user={currentUser}
              band={currentBand}
              bandId={currentBandId}
              setSelectedBand={setBand}
            />
          }
        />
        <Route
          path="/finances"
          element={
            <Finance
              user={currentUser}
              band={currentBand}
              bandId={currentBandId}
              setSelectedBand={setBand}
            />
          }
        />
        <Route
          path="/members"
          element={
            <Members
              user={currentUser}
              band={currentBand}
              bandId={currentBandId}
              setSelectedBand={setBand}
            />
          }
        />
        <Route
          path="/setlists"
          element={
            <SetLists
              user={currentUser}
              band={currentBand}
              bandId={currentBandId}
              setSelectedBand={setBand}
            />
          }
        />
        <Route
          path="/tasks"
          element={
            <Tasks
              user={currentUser}
              band={currentBand}
              bandId={currentBandId}
              setSelectedBand={setBand}
            />
          }
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
