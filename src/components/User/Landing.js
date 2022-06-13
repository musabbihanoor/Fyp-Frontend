import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";

const Landing = ({ auth: { isAuthenticated, loading, user }, history }) => {
  const [show, setShow] = useState("login");

  useEffect(() => {
    // Redirect if logged out
    if (isAuthenticated && !loading) {
      console.log("redirecting");
      history.push("/timeline");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loading]);

  return (
    <div>
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={12} sm={6}>
          <img
            src="https://images.unsplash.com/photo-1598777142552-edf35dc975ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="brand"></img>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          style={{ padding: 10 }}
          alignItems="center"
          direction="column"
          justify="space-between">
          {show === "login" && <Login setShow={setShow} />}
          {show === "register" && <Register setShow={setShow} />}
          {show === "reset" && <ResetPassword setShow={setShow} />}
        </Grid>
      </Grid>
    </div>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(withRouter(Landing));
