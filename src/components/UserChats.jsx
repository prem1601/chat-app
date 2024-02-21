import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "./Firebase";
import { AuthUser } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";

export default function UserChats() {
  // Chats
  const [chats, setChats] = useState([]);
  // console.log('chats', chats);

  // Current user
  const { currentUser } = useContext(AuthUser);

  // Another user
  const { dispatch } = useContext(ChatContext);

  // Get realtime data
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      // console.log("Current data: ", doc.data());
      setChats(Object.entries(doc.data()));
    });

    return () => {
      currentUser && unsub();
    };
  }, [currentUser.uid]);

  // Handle select
  const handleSelect = (data) => {
    dispatch({
      type: "CHANGE_USER",
      state: data,
    });
    // console.log('set user', data);
  };

  return (
    <div className="border-top user-chats overflow-auto">
      {
        // chatArr
        // Object.entries(chats)
        chats
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((data) => (
            <div
              className={`d-flex flex-wrap border-bottom justify-content-around py-3 cursor-pointer`}
              key={data[0]}
              onClick={() => handleSelect(data[1].userInfo)}
            >
              {console.log("data", data)}
              <div className="col-3">
                <img
                  src={data[1].userInfo.photoURL}
                  alt="User Profile"
                  className="img-fluid user-profile rounded rounded-circle"
                />
              </div>
              <div className="col-8 pt-1">
                <h4 className="mb-1">{data[1].userInfo.displayName}</h4>
                <small className="artist-product-description-1">
                  {data[1].lastMessage?.text}
                </small>
              </div>
            </div>
          ))
      }
    </div>
  );
}
