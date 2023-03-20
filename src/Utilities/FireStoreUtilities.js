import { getAuth } from "firebase/auth";
import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

/**
 * Checks if user exists in Firestore
 * @param _userId The ID of the user to check the database for
 * @return True if user exists & false if not
 */
export async function doesUserExist(_userId) {
  const docRef = await doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
}

/**
 * Checks if user exists in Firestore
 * @param _userId The ID of the user to check the database for
 * @return user if exists, false if not
 */
export async function getUser(_userId) {
  const docRef = await doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let userObject = {
      userid: docSnap.data().userid,
      bands: docSnap.data().bands,
    };
    return userObject;
  } else {
    return false;
  }
}

/**
 * Checks if band exists in Firestore
 * @param _bandId The ID of the band to check the database for
 * @return band if exists, false if not
 */
export async function getBand(_bandId) {
  const docRef = await doc(getFirestore(), "bands", _bandId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return false;
  }
}

/**
 * Adds user to Firestore
 * @param _userId The ID of the user to add to firestore database
 */
export async function addUser(_userId) {
  await setDoc(doc(getFirestore(), "users", _userId), {
    userid: _userId,
    bands: [],
  });
}

/**
 * Create new band
 * @param _userId The ID of the user to add the band for
 * @param _bandName The band name
 */
export async function createBand(_userId, _bandName) {
  const auth = getAuth();

  //Reference to user document
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  //Add new band to bands collection
  const docRef = await addDoc(collection(getFirestore(), "bands"), {
    bandName: _bandName,
    ownerId: _userId,
    members: [
      {
        fullName: auth.currentUser.displayName,
        role: "Leader",
        instrument: "",
        permissions: {
          dashboard: true,
          bandChat: true,
          tasks: true,
          events: true,
          finances: true,
          setLists: true,
        },
      },
    ],
    inviteCode: "",
    joinRequests: [],
  });

  await updateDoc(docRef, { inviteCode: docRef.id });

  //Create new band object
  const newBandObject = { bandName: _bandName, bandId: docRef.id };

  //Append new band to the user's band list
  const newBandsList = [...docSnap.data().bands, newBandObject];

  //Update user band list with new band list
  await updateDoc(userRef, { bands: newBandsList });

  return docRef.id;
}
