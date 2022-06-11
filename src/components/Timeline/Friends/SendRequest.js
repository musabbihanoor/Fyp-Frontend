import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Button, Avatar } from "@material-ui/core";
import Popup from "../../Popup/Popup";

const SendRequest = ({
  profile: { name, profile_picture, mutual_friends, id },
  profile,
  user,
  createFriendRequest,
  history,
}) => {
  const [show, setShow] = useState(true);
  const [pop, setPop] = useState(false);

  useEffect(() => {
    if (
      user.friend_list.find((x) => x.id === id) ||
      user.request_list.find((x) => x.id === id) ||
      profile.request_list.find((x) => x === user.id)
    ) {
      setShow(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.friend_list]);
  return (
    <Fragment>
      {show && (
        <Grid
          container
          spacing={3}
          alignItems="center"
          style={{
            border: "1px solid #eee",
            borderRadius: 20,
            marginBottom: 20,
            cursor: "pointer",
            background: "#fff",
          }}>
          <Grid item xs={3} m={0}>
            <Avatar
              style={{ width: "100px", height: "100px" }}
              alt="friend-request-profile"
              src={
                profile_picture
                  ? profile_picture
                  : "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
              }
            />
          </Grid>
          <Grid item>
            <Link to={{ pathname: "/profile", state: { user: profile } }}>
              <h3 style={{ margin: 0 }}>{name}</h3>
            </Link>
            <h4 style={{ margin: "5px 0", color: "#3f51b5" }}>
              Mutual friends: {mutual_friends}
            </h4>

            <Button
              size="small"
              variant="contained"
              color="primary"
              style={{ marginRight: 5 }}
              onClick={() => {
                createFriendRequest(id).then((res) => setPop(true));
                setShow(false);
              }}>
              Send Request
            </Button>
          </Grid>
        </Grid>
      )}
      {pop && (
        <Popup func={() => setPop(false)} heading={"Friend Request Sent!"} />
      )}
    </Fragment>
  );
};

export default SendRequest;
