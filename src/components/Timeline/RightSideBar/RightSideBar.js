import React from "react";
import FriendRequest from "./FriendRequest";
import GroupAd from "./GroupAd";
import Friends from "./Friends";

const RightSideBar = ({ user }) => {
  return (
    <div className="right-bar">
      {/* <FriendRequest /> */}
      <Friends user={user} />
      <GroupAd />
    </div>
  );
};

export default RightSideBar;
