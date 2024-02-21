import React, { useContext, useEffect, useRef } from "react";
import { AuthUser } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";

export default function Message({ message }) {
  // console.log("message", message);
  // Current user
  const { currentUser } = useContext(AuthUser);

  // Another user
  const { data } = useContext(ChatContext);

  // latest message scroll
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // Message sent date
  const milliseconds =
    message.date.seconds * 1000 + Math.floor(message.date.nanoseconds / 1e6);

  // Create a new Date object with the milliseconds
  const date = new Date(milliseconds);

  // Get hour and minute from the Date object
  let hour = date.getHours();
  let minute = date.getMinutes();

  // Period am or pm
  let period = "AM";
  if (hour >= 12) {
    period = "PM";
  }
  if (hour > 12) {
    hour -= 12;
  }

  return (
    // owner
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid &&
        "owner"} d-flex flex-wrap gap-3 mb-2`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="User"
          className="user-profile rounded rounded-circle"
        />
        <br />
        <small className="mb-0 mt-1 text-secondary">
          {/* {date.toLocaleDateString()} <br /> */}
          {hour > 9 ? hour : ["0" + hour]} :{" "}
          {minute > 9 ? minute : ["0" + minute]} {period}
        </small>
      </div>
      {/* bg-danger border-top-0 border-end-0 rounded-start-1 rounded-bottom-1 */}
      <div className="messageContent col-8 pt-2">
        <span className="d-flex">
          <p className="my-2">{message.text}</p>
        </span>
        {message.img && (
          <img
            src={message.img}
            alt=""
            className="rounded"
            style={{ height: "300px", width: "300px" }}
          />
        )}
      </div>
    </div>
  );
}
