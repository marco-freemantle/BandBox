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
} from "firebase/firestore";

/**
 * Checks if user exists in Firestore
 * @param _userId The ID of the user to check the database for
 * @return True if user exists & false if not
 */
export async function getUser(_userId) {
  const docRef = await doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return true;
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
  });
}
