import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./Signup.css";
import { Link } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState, useEffect } from "react";

/**
 * @returns The user signup page
 */
function Signup() {
  //State for email, name and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  //State for if an signup error occurs
  const [signupError, setSignupError] = useState("");

  //State for device size
  const [isDeviceSmall, setIsDeviceSmall] = useState(false);

  /**
   * Handles account creation with firebase
   */
  function createUserAccount(event) {
    //Stops the page from reloading
    event.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        //Sets display name for the user
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: "",
        }).then(() => {
          //Switches to home screen upon account creation
          window.location.pathname = "/";
        });
      })
      .catch((error) => {
        //Return an error message
        const errorMessage = error.message;
        setSignupError(errorMessage);
      });
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const handleResize = () => {
    if (window.innerWidth < 1000) {
      setIsDeviceSmall(true);
    } else {
      setIsDeviceSmall(false);
    }
  };

  /**
   * Gets the appropriate error message for the signup error
   * @return The signup error message
   */
  function getSignupErrorMessage() {
    if (signupError === "Firebase: Error (auth/email-already-in-use).") {
      return <p className="error-message-signup">Email already in use</p>;
    } else if (signupError === "Firebase: Error (auth/invalid-email).") {
      return <p className="error-message-signup">Invalid email</p>;
    } else if (
      signupError ===
      "Firebase: Password should be at least 6 characters (auth/weak-password)."
    ) {
      return <p className="error-message-signup">Password is too weak</p>;
    } else if (signupError === "Firebase: Error (auth/missing-password).") {
      return <p className="error-message-signup">Password is missing</p>;
    } else if (signupError === "Firebase: Error (auth/missing-email).") {
      return <p className="error-message-signup">Email is missing</p>;
    } else if (signupError === "Username is too short") {
      return <p className="error-message-signup">Username is too short</p>;
    } else if (signupError === "Username is already taken") {
      return <p className="error-message-signup">Username is already taken</p>;
    }
  }

  return (
    <div className="signup-page-flexbox">
      <div className="main-content-signup">
        <h1 className="form-title-signup">Signup For BandBox!</h1>
        <p className="form-subtitle-login">
          Signup using an email and password. It's Free!
        </p>
        <Form className="signup-form" onSubmit={createUserAccount}>
          <Form.Group controlId="formBasicName">
            <Form.Control
              className="signup-name-field"
              type="text"
              placeholder="Enter full name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              We need this so your band members can identify you.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              className="signup-email-field"
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              className="signup-password-field"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text className="text-muted">Make it strong!</Form.Text>
          </Form.Group>

          <Button type="submit" variant="primary" className="signup-button">
            Signup
          </Button>

          {getSignupErrorMessage()}

          <br />
          {isDeviceSmall && (
            <Link to="/login">
              <Button variant="primary" className="mobile-signup-button">
                Sign in
              </Button>
            </Link>
          )}
        </Form>
      </div>
      {!isDeviceSmall && (
        <div className="sidebar-signup">
          <h1 className="sidebar-signup-title">Have An Account?</h1>
          <p className="sidebar-signup-text">Welcome back!</p>
          <p className="sidebar-signup-text">
            Click below to sign in to you BandBox account
          </p>
          <Link to="/login">
            <Button variant="primary" className="sidebar-signup-button">
              Sign in
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Signup;
