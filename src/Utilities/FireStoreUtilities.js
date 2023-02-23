import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
      bandName: docSnap.data().bandName,
    };
    return userObject;
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
    bandName: "",
    bandId: "",
  });
}

/**
 * Create new band
 * @param _userId The ID of the user to add the band for
 * @param _bandName The calorie entry object to add
 */
export async function createBand(_userId, _bandName) {
  const userRef = doc(getFirestore(), "users", _userId);

  const docRef = await addDoc(collection(getFirestore(), "bands"), {
    bandName: _bandName,
    ownerId: _userId,
  });

  await updateDoc(userRef, { bandName: _bandName, bandId: docRef.id });
}
