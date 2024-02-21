import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "./Firebase";
import { AuthUser } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";

export default function Search() {
  // Username
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("userName", userName);
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      // console.log("querySnapshot", querySnapshot);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUser(doc.data());
        // console.log("doc.data()", doc.data());
      });
    } catch (error) {
      setErr(true);
    }
    // setUserName("");
  };

  // Current user
  const { currentUser } = useContext(AuthUser);

  // Chat user
  const { dispatch } = useContext(ChatContext);
  // console.log('currentUser', currentUser);

  const handleSelect = async (e) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    // console.log("combined Id", combinedId);
    try {
      // console.log("into try block");
      const res = await getDoc(doc(db, "chats", combinedId));
      // console.log("res get docs", res);

      if (!res.exists()) {
        console.log("creating chats collection");
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        console.log("created chats collection");
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log("Updated first user chats");
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        dispatch({
          type: "CHANGE_USER",
          state: user,
        });
        console.log("Updated second user chats");
      }
    } catch (error) {
      console.error(error);
      setErr(true);
    }
    setUser(null);
    setUserName("");
  };

  return (
    <div className="mb-md-4 my-2">
      <form onSubmit={handleSubmit} className="chatSearch position-relative">
        <div>
          <input
            type="text"
            className="form-control w-100"
            placeholder="🔍 Search"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button className="btn btn-search" type="submit">
            Search
          </button>
        </div>
      </form>
      {err && <p>User not found!</p>}
      {user && (
        <div onClick={handleSelect} className="cursor-pointer user-chats">
          <div className="d-flex flex-wrap justify-content-around py-3">
            <div className="col-3">
              <img
                src={user?.photoURL}
                alt="User Profile"
                className="img-fluid user-profile rounded rounded-circle"
              />
            </div>
            <div className="col-8 pt-1">
              <h5 className="mb-1 text-capitalize">{user?.displayName}</h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
