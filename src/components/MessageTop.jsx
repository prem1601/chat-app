import React, { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";

export default function MessageTop() {
  // Another user
  const { data } = useContext(ChatContext);
  // console.log('data', data);

  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center admin-light-background px-2 py-4">
      <div className="col-md-3 col-4">
        <img
          src={data.user.photoURL}
          alt=""
          width={50}
          height={50}
          className="rounded rounded-circle "
        />
        <span className="h4 ms-2 mb-0">{data.user?.displayName}</span>
      </div>
      <div className="col-6 text-end">
        <span className="mb-0 py-1 px-2 rounded rounded-5 bg-body-secondary cursor-pointer">
          ⚬⚬⚬
        </span>
      </div>
    </div>
  );
}
