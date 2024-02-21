import { IoMdSend } from "react-icons/io";
import { FaFileAlt } from "react-icons/fa";
import { useState } from "react";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "./Firebase";
import { useContext } from "react";
import { AuthUser } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function SendMessage() {
  // Data
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  // Current user
  const { currentUser } = useContext(AuthUser);

  // Another user
  const { data } = useContext(ChatContext);

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          // setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    // Update users chats
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="position-relative">
      <input
        type="text"
        placeholder="Type something..."
        className="form-control send-message admin-background-color border-0 rounded rounded-0"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="send-message-absolute">
        <label htmlFor="imgFile">
          <input
            type="file"
            id="imgFile"
            name="file"
            className="form-control d-none"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <FaFileAlt className="file-icon" />
        </label>
        <button className="btn p-0 ms-2 border-0" disabled={text === ""}>
          <IoMdSend className="send-message-icon" />
        </button>
      </div>
    </form>
  );
}
