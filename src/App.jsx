import React, { useContext } from "react";
import "./ChatApp.css";
import Sidebar from "./components/Sidebar";
import Messages from "./components/Messages";
import SignInPage from "./components/SignInPage";
import { AuthUser } from "./contexts/AuthContext";
import { ChatContext } from "./contexts/ChatContext";

export default function App() {
  // Current user
  const { currentUser } = useContext(AuthUser);

  // Another User
  const { data } = useContext(ChatContext);

  return currentUser ? (
    <div className="container d-flex" style={{ height: "100vh" }}>
      <div className="col-12 m-auto">
        <div className="d-flex flex-wrap border rounded overflow-hidden">
          <div className="col-4 p-2 border-end">
            <Sidebar />
          </div>
          <div className={`col-8 ${data.chatId === "null" && "message-before-select"}`}>
            {data.chatId !== "null" && <Messages />}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <SignInPage />
  );
}
