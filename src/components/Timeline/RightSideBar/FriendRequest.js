import React from "react";
import { Avatar, Button } from "@material-ui/core";
import { Check, CancelOutlined } from "@material-ui/icons";

const FriendRequest = () => {
  return (
    <div className='friend-request'>
      <Avatar />
      <h3>Sarim Sikander</h3>
      <p>Sent you a friend request</p>
      <span>
        <Button variant='contained' color='primary' style={{ marginRight: 5 }}>
          <Check />
          Accept
        </Button>
        <Button variant='outlined' color='secondary'>
          <CancelOutlined />
          Declined
        </Button>
      </span>
    </div>
  );
};

export default FriendRequest;
