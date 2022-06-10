import React from "react";
import { Button } from "@material-ui/core";

const GroupAd = () => {
  return (
    <div className='group-ad'>
      <img
        alt='pic'
        src='https://ethnomed.org/wp-content/uploads/2009/12/mosque.jpg'
      />
      <h3>Ulema Academy</h3>
      <p>Group to emphasize importance of modern Islamic learning</p>
      <Button variant='outlined' color='primary'>
        Join
      </Button>
    </div>
  );
};

export default GroupAd;
