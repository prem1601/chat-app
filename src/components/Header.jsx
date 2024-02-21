import React, { useContext } from "react";
import { AuthUser } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase";

export default function Header() {
  // Current user
  const { currentUser, dispatch } = useContext(AuthUser);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: "update",
          state: null,
        });
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center">
      <div className="col-md-3 col-4">
        <img
          src="/mainLogo.png"
          alt="Logo"
          className="img-fluid w-100 rounded rounded-circle "
        />
      </div>
      <div className="col-7 text-end">
        <div className="d-flex flex-wrap justify-content-end align-items-center">
          <img
            src={currentUser.photoURL}
            alt=""
            height={50}
            width={50}
            className="border rounded rounded-circle"
          />
          <h4 className="mb-1 px-1">{currentUser.displayName}</h4>
        </div>
        <button
          className="btn text-decoration-underline fs-6 p-1 py-0"
          onClick={handleSignOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
