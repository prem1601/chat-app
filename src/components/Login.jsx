import React, { useContext, useState } from "react";
import { auth } from "./Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthUser } from "../contexts/AuthContext";

export default function Login({ setLogin }) {
  // Error
  const [err, setErr] = useState(false);

  // current user
  const { dispatch } = useContext(AuthUser);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const displayName = e.target[0].value;
    const email = e.target[0].value;
    const password = e.target[1].value;

    // console.log("displayName", displayName);
    // console.log("email", email);
    // console.log("password", password);
    // console.log("file", file);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      dispatch({
        type: "initialize",
        state: res.user,
      });
      // console.log("userCredential", res.user);
    } catch (error) {
      setErr(true);
    }
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="col-2 mx-auto mb-4">
        <img src="/mainLogo.png" alt="Logo" className="img-fluid w-100 rounded rounded-circle box-shadow" />
      </div>
      <div className="col-9 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="my-1">
            <input
              type="email"
              placeholder="acb@gmail.com"
              name="email"
              className="form-control my-3"
              required
            />
            <input
              type="password"
              placeholder="********"
              name="password"
              className="form-control my-3"
              required
            />
            {err && <p className="m-0 text-danger">Something went wrong..!</p>}
            <input
              type="submit"
              value="Login"
              className="form-control btn btn-secondary border mb-2"
            />
          </div>
        </form>
        <p>
          Not registered yet!{" "}
          <button
            className="btn p-0 pb-1 text-decoration-underline text-primary"
            onClick={() => setLogin(false)}
          >
            Register
          </button>
        </p>
      </div>
    </>
  );
}
