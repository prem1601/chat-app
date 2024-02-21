import React from "react";
import Search from "./Search";
import Header from "./Header";
import UserChats from "./UserChats";

export default function Sidebar() {
  return (
    <>
      <Header />
      <Search />
      <UserChats />
    </>
  );
}
