import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App.jsx";
import AuthContext from "./contexts/AuthContext.jsx";
import ChatContextProvider from "./contexts/ChatContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContext>
    <ChatContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContext>
);
