import React, { useContext, useState } from "react";
import { auth, db, storage } from "./Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { AuthUser } from "../contexts/AuthContext";

export default function Register({ setLogin }) {
  // Error
  const [err, setErr] = useState(false);

  // current user
  const { dispatch } = useContext(AuthUser);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    // console.log("displayName", displayName);
    // console.log("email", email);
    // console.log("password", password);
    // console.log("file", file);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // console.log("userCredential", res.user.uid);

      // Upload image
      const storageRef = ref(storage, res.user.uid);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("got photo");
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            console.log("photo updated");
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            dispatch({
              type: "initialize",
              state: res.user,
            });
            console.log("all updated");
          });
        }
      );
    } catch (error) {
      console.log("error", error);
      setErr(true);
    }
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className="col-2 mx-auto mb-4">
        <img
          src="/mainLogo.png"
          alt="Logo"
          className="img-fluid w-100 rounded rounded-circle box-shadow"
        />
      </div>
      <div className="col-9 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="my-1">
            <input
              type="text"
              placeholder="Name"
              name="displayName"
              className="form-control my-3"
              required
            />
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
            <input
              type="file"
              name="profile"
              className="form-control my-3"
              required
            />
            {err && <p className="text-danger">Something went wrong..!</p>}
            <input
              type="submit"
              value="Register"
              className="form-control btn btn-secondary border mb-2"
            />
          </div>
        </form>
        <p>
          Already registered!{" "}
          <button
            className="btn p-0 pb-1 text-decoration-underline text-primary"
            onClick={() => setLogin(true)}
          >
            Login
          </button>
        </p>
      </div>
    </>
  );
}
