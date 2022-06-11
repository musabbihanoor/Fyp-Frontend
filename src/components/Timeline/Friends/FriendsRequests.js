import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

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
  // const [suggest, setSuggest] = useState(null);
  // const [request, setRequest] = useState(null);

  useEffect(() => {
    getProfiles();
    // // res.map(x => {
    // //   console.log()
    // // })
    // if (friend_list.length > 0) {
    //   const data1 = res.filter((x) => friend_list.map(y => ));
    //   console.log(data1);
    // }
    // if (request_list.length > 0) {
    //   const data2 = res.filter((x) => x.id !== request_list.id);
    //   console.log(data2);
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h3>Friend Request</h3>
      {user &&
        user.request_list.map((x, i) => (
          <AcceptRequest
            key={i}
            profile={x}
            acceptFriendRequest={acceptFriendRequest}
          />
        ))}

      <h3>Suggested for you</h3>
      {!loading &&
        profiles.length > 0 &&
        profiles.map((x, i) => (
          <SendRequest
            key={i}
            profile={x}
            user={user}
            createFriendRequest={createFriendRequest}
          />
        ))}
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
