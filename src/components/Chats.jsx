import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../contexts/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./Firebase";

export default function Chats() {
  // State
  const [messages, setMessages] = useState([]);

  // Another user
  const { data } = useContext(ChatContext);
  // console.log("chat user", data);

  // Get messages
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      // console.log("Current data: ", doc.data());
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <>
      <hr className="m-0 mb-1" />
      <div className="px-2 chats-height">
        {messages.map((m) => (
          <Message message={m} key={m.id} />
        ))}
      </div>
      <hr className="m-0 mt-1" />
    </>
  );
}
