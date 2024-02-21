import { createContext, useReducer } from "react";

export const AuthUser = createContext();
export default function AuthContext({ children }) {

  function userReducer(state, action) {
    switch (action.type) {
      case "initialize":
        return action.state;
      case "update":
        return action.state;
      default:
        return state;
    }
  }
  const [currentUser, dispatch] = useReducer(userReducer, null);
  return (
    <AuthUser.Provider value={{ currentUser, dispatch }}>
      {children}
    </AuthUser.Provider>
  );
}
