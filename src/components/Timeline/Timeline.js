import React, { useEffect, Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import AddPost from "./Post/AddPost";
import Posts from "./Post/Posts";
import Menu from "./Menu";
import FriendRequest from "./Friends/FriendsRequests";
import RightSideBar from "./RightSideBar/RightSideBar";
import { Grid } from "@material-ui/core";

import "./Timeline.css";

const Timeline = ({
  auth: { isAuthenticated, loading, user, verified },
  profile: { profile },
  history,
  nav,
  setNav,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Redirect if logged out
    if (!isAuthenticated && !loading) {
      console.log("redirecting");
      history.push("/");
    }

    if (isAuthenticated && !loading && !verified) {
      history.push("/verify");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loading]);

  return (
    <Fragment>
      {user && (
        <div className="timeline">
          <Grid container spacing={3}>
            <Grid
              item
              xs={3}
              style={{
                position: "fixed",
                height: "100vh",
              }}>
              {profile && <Menu user={user} setNav={setNav} />}
            </Grid>
            <Grid
              item
              xs={6}
              className="timeline-main"
              style={{ margin: "0 auto" }}>
              {nav === 1 && (
                <>
                  {profile && (
                    <AddPost user={user} data={data} setData={setData} />
                  )}

                  <Posts user={false} data={data} setData={setData} />
                </>
              )}
              {nav === 2 && (
                <>
                  <FriendRequest />
                </>
              )}
            </Grid>
            <Grid
              item
              xs={3}
              className="right-timeline"
              style={{
                position: "fixed",
                height: "100vh",
                right: 0,
              }}>
              <RightSideBar user={user} />
            </Grid>
          </Grid>
        </div>
      )}
    </Fragment>
  );
};

Timeline.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  // getVerses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {})(withRouter(Timeline));
