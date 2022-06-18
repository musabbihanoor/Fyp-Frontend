import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Grid, Button, Avatar } from "@material-ui/core";
import { Check, CancelOutlined } from "@material-ui/icons";

const AcceptRequest = ({
  acceptFriendRequest,
  profile: { id, name, profile_picture, mutual_friends },
  profile,
}) => {
  const [show, setShow] = useState(true);
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
            {" "}
            <Link to={{ pathname: "/profile", state: { user: profile } }}>
              <h3 style={{ margin: 0 }}>{name}</h3>{" "}
            </Link>
            <Button
              size="small"
              variant="contained"
              color="primary"
              style={{ marginRight: 5 }}
              onClick={() => {
                acceptFriendRequest(profile, "accept");
                setShow(false);
              }}>
              <Check />
              Accept
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={() => {
                acceptFriendRequest(profile, "reject");
                setShow(false);
              }}>
              <CancelOutlined />
              Declined
            </Button>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default AcceptRequest;
