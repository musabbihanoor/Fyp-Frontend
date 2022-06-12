import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Loading from "../../Layout/Loading";

import {
  getProfiles,
  createFriendRequest,
  acceptFriendRequest,
} from "../../../actions/profile";

import AcceptRequest from "./AcceptRequest";
import SendRequest from "./SendRequest";

const FriendsRequest = ({
  getProfiles,
  createFriendRequest,
  acceptFriendRequest,
  profile: { loading, profiles },
  auth: { user },
}) => {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getProfiles().then((res) => setLoad(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h3>Friend Request</h3>
      {user && user.request_list.length > 0 ? (
        user.request_list.map((x, i) => (
          <AcceptRequest
            key={i}
            profile={x}
            acceptFriendRequest={acceptFriendRequest}
          />
        ))
      ) : (
        <p style={{ color: "#F50057" }}>No Request</p>
      )}

      <h3>Suggested for you</h3>
      {!loading && profiles.length > 0 ? (
        profiles.map((x, i) => (
          <SendRequest
            key={i}
            profile={x}
            user={user}
            createFriendRequest={createFriendRequest}
          />
        ))
      ) : (
        <p style={{ color: "#F50057" }}>No suggested user</p>
      )}
      {load && <Loading />}
    </>
  );
};

FriendsRequest.propTypes = {
  getProfiles: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createFriendRequest: PropTypes.func.isRequired,
  acceptFriendRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getProfiles,
  createFriendRequest,
  acceptFriendRequest,
})(withRouter(FriendsRequest));
