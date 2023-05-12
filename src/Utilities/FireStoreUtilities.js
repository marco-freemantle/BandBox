import { getAuth } from "firebase/auth";
import { isEqual } from "lodash";
import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  collection,
  updateDoc,
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
        userId: auth.currentUser.uid,
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
    tasks: {
      Complete: {
        items: [],
      },
      Ideas: {
        items: [],
      },
      "In Progress": {
        items: [],
      },
      "To do": {
        items: [],
      },
    },
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

/**
 * Request to join a bands workspace
 * @param _bandId The Id of the band to send the request to
 */
export async function sendJoinRequest(_bandId) {
  const auth = getAuth();

  //Reference to band document
  const bandRef = doc(getFirestore(), "bands", _bandId);
  const docSnap = await getDoc(bandRef);

  //Invite code is invalid
  if (!docSnap.data()) {
    return {
      text: "That is not a valid invite code.",
      style: { color: "red", marginTop: "25px", textAlign: "center" },
    };
  }

  //Create user join request object
  const joinRequest = {
    fullName: auth.currentUser.displayName,
    userId: auth.currentUser.uid,
  };

  //Check if user has already sent a join request
  const requestExists = docSnap.data().joinRequests.some((request) => {
    return isEqual(request, joinRequest);
  });

  if (requestExists) {
    return {
      text: "You have already sent a join request. The band leader will review your request.",
      style: { color: "red", marginTop: "25px", textAlign: "center" },
    };
  }

  //Append new request to the band's requests list
  const newRequestsLists = [...docSnap.data().joinRequests, joinRequest];

  //Update band request list with new list
  await updateDoc(bandRef, { joinRequests: newRequestsLists });

  return {
    text: "You have sent a join request! Sit tight, the band leader will review your request.",
    style: { color: "green", marginTop: "25px", textAlign: "center" },
  };
}

/**
 * Reject a users join request
 * @param _user The user object to reject
 * @param _bandId The id of the band that is rejecting the request
 */
export async function rejectJoinRequest(_user, _bandId) {
  //Reference to band document
  const bandRef = doc(getFirestore(), "bands", _bandId);
  const docSnap = await getDoc(bandRef);

  const newJoinRequestArray = docSnap
    .data()
    .joinRequests.filter((request) => !isEqual(request, _user));

  //Update band request list with new list (join request has been removed)
  await updateDoc(bandRef, { joinRequests: newJoinRequestArray });
}

/**
 * Accepts a users join request
 * @param _user The user object to accept
 * @param _band The band that is accepting the request
 */
export async function acceptJoinRequest(_user, _band) {
  //Reference to band document
  const bandRef = doc(getFirestore(), "bands", _band.inviteCode);
  const docSnap = await getDoc(bandRef);

  const newJoinRequestArray = docSnap
    .data()
    .joinRequests.filter((request) => !isEqual(request.userId, _user.userId));

  //Update band request list with new list (join request has been removed)
  await updateDoc(bandRef, { joinRequests: newJoinRequestArray });

  //Add new member to the band's members list
  let newMembersList = docSnap.data().members;
  newMembersList.push(_user);

  await updateDoc(bandRef, { members: newMembersList });

  //Add band to user's band list
  const userRef = doc(getFirestore(), "users", _user.userId);
  const userDocSnap = await getDoc(userRef);

  const newBandObject = {
    bandId: _band.inviteCode,
    bandName: _band.bandName,
  };

  //Append new band to the user's band list
  const newBandsList = [...userDocSnap.data().bands, newBandObject];
  //Update user band list with new band list
  await updateDoc(userRef, { bands: newBandsList });
}

/**
 * Updates task list in firestore
 * @param _bandId The band that is changing its tasks
 */
export async function updateTaskList(_bandId, taskColumns) {
  //Reference to band document
  const bandRef = doc(getFirestore(), "bands", _bandId);

  const newTaskList = {
    Complete: {
      items: [],
    },
    Ideas: {
      items: [],
    },
    "In Progress": {
      items: [],
    },
    "To do": {
      items: [],
    },
  };

  for (const [, value] of Object.entries(taskColumns)) {
    for (const [key, items] of Object.entries(newTaskList)) {
      if (value.name === key) {
        items.items = value.items;
      }
    }
  }

  //Update band task list with new task list
  await updateDoc(bandRef, { tasks: newTaskList });
}

/**
 * Adds a new song to a setLis
 * @param bandId The band to add the new song for
 * @param newSong The new song object to add
 * @param setList The setList to add the song to
 */
export async function addNewSong(bandId, newSong, setList) {
  //Reference to band document
  const bandRef = doc(getFirestore(), "bands", bandId);
  const docSnap = await getDoc(bandRef);

  //Append new song to song list for a specified set list
  const newSongList = [...docSnap.data().setLists[setList].songs, newSong];

  //Update user band list with new band list
  await updateDoc(bandRef, {
    [`setLists.${setList}.songs`]: newSongList,
  });
}

/**
 * Deletes a song from a setlist
 * @param bandId The band to delete the new song for
 * @param song The song object to remove
 * @param setList The setList to remove the song from
 */
export async function deleteSong(bandId, song, setList) {
  //Reference to band document
  const bandRef = doc(getFirestore(), "bands", bandId);
  const docSnap = await getDoc(bandRef);

  //Retrieve the existing song list for the specified set list
  const existingSongs = docSnap.data().setLists[setList].songs;

  //Remove the song from the song list
  const newSongList = existingSongs.filter((s) => s.id !== song.id);

  //Update the band document with the new song list
  await updateDoc(bandRef, {
    [`setLists.${setList}.songs`]: newSongList,
  });
}

/**
 * Updates a songs details
 * @param bandId The band to update the song details for
 * @param song The song object to update
 * @param setList The setList to update the song for
 */
export async function updateSong(bandId, song, setList) {
  //Reference to band document
  const bandRef = doc(getFirestore(), "bands", bandId);
  const docSnap = await getDoc(bandRef);

  //Retrieve the existing song list for the specified set list
  const existingSongs = docSnap.data().setLists[setList].songs;

  //Remove the song from the song list
  const tempSongList = existingSongs.filter((s) => s.id !== song.id);

  //Add amended song
  const newSongList = [...tempSongList, song];

  //Update the band document with the new song list
  await updateDoc(bandRef, {
    [`setLists.${setList}.songs`]: newSongList,
  });
}
