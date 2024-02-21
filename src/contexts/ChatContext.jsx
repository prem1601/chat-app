import { createContext, useContext, useReducer } from "react";
import { AuthUser } from "./AuthContext";

export const ChatContext = createContext();

export default function ChatContextProvider({ children }) {
  const { currentUser } = useContext(AuthUser);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  function userReducer(state, action) {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.state,
          chatId:
            currentUser.uid > action.state.uid
              ? currentUser.uid + action.state.uid
              : action.state.uid + currentUser.uid,
        };

      default:
        return state;
    }
  }
  const [user, dispatch] = useReducer(userReducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ data: user, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}
