import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function SignInPage() {
  // Logged in
  const [isLogin, setLogin] = useState(true);
  return (
    <div style={{ height: "100vh" }} className="d-flex flex-wrap">
      <div className="col-md-5 col-10 m-auto">
        <div className="shadow rounded rounded-3 p-3">
          {isLogin ? (
            <Login setLogin={setLogin} />
          ) : (
            <Register setLogin={setLogin} />
          )}
        </div>
      </div>
    </div>
  );
}
