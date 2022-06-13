import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// import Loading from "../Layout/Loading";

import { Grid, TextField, Button, InputAdornment } from "@material-ui/core";
import { AccountCircle, LockRounded } from "@material-ui/icons";

import {
  requestResetCode,
  requestResetPassword,
  resetPassword,
} from "../../actions/auth";

const ResetPassword = ({
  setShow,
  requestResetCode,
  requestResetPassword,
  resetPassword,
}) => {
  const [username, setUsername] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState({});
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  //   const [loading, setLoading] = useState(false);

  const sendVerification = async (e) => {
    e.preventDefault();
    requestResetPassword(username).then((res) =>
      res.status === 200 || res.status === 201
        ? setSent(true)
        : res.status === 400 && setErr(res.data),
    );
  };

  const sendCode = async (e) => {
    e.preventDefault();
    requestResetCode({ code: code }, username).then((res) =>
      res.status === 200 || res.status === 201
        ? setVerified(true)
        : res.status === 400 && setErr(res.data),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    resetPassword({
      password: password,
      password2: password2,
      username: username,
      type: "forgot",
    }).then((res) =>
      res.status === 200 || res.status === 201
        ? setShow("login")
        : res.status === 400 && setErr(res.data),
    );
  };

  useEffect(() => {
    console.log(err.response);
  }, [err]);

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 400,
          minWidth: 300,
          marginTop: 100,
        }}>
        <Grid container justify="center">
          <img
            src="https://www.pngfind.com/pngs/b/527-5272118_bismillah-calligraphy-png.png"
            width={100}
            alt="logo"></img>
        </Grid>

        <p>
          {!sent
            ? "Enter your username to send verification code"
            : sent && !verified
            ? "Enter the verification code that has been sent to your email"
            : "Enter new password"}
        </p>

        {!sent && (
          <>
            <TextField
              error={err.verify}
              id={err.verify ? "outlined-error-helper-text" : "outlined-basic"}
              helperText={err.verify && err.verify}
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </>
        )}

        {sent && !verified && (
          <>
            <TextField
              error={err.code}
              id={err.code ? "outlined-error-helper-text" : "outlined-basic"}
              helperText={err.code && err.code}
              label="Code"
              variant="outlined"
              margin="normal"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </>
        )}

        {verified && (
          <>
            <TextField
              error={err.password}
              id={
                err.password ? "outlined-error-helper-text" : "outlined-basic"
              }
              label="Password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              error={err.password}
              id={
                err.password ? "outlined-error-helper-text" : "outlined-basic"
              }
              helperText={err.password && err.password}
              label="Confirm password"
              variant="outlined"
              margin="normal"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </>
        )}

        <div style={{ height: 20 }}>
          <Button
            color="primary"
            width="100%"
            variant="contained"
            href="/timeline"
            onClick={(e) =>
              !sent
                ? sendVerification(e)
                : sent && !verified
                ? sendCode(e)
                : onSubmit(e)
            }>
            Send
          </Button>
        </div>

        <div style={{ height: 20, marginTop: 30 }}>
          {!sent ? (
            <>
              Want to go back?{" "}
              <Button onClick={() => setShow("login")}>Login</Button>
            </>
          ) : (
            <>
              Change username?{" "}
              <Button
                onClick={() => {
                  setSent(false);
                  setVerified(false);
                }}>
                Go Back
              </Button>
            </>
          )}
        </div>
      </div>

      {/* {loading && <Loading />} */}
    </Fragment>
  );
};

ResetPassword.propTypes = {
  //   auth: PropTypes.object.isRequired,
  requestResetCode: PropTypes.func.isRequired,
  requestResetPassword: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  //   auth: state.auth,
});

export default connect(mapStateToProps, {
  requestResetCode,
  requestResetPassword,
  resetPassword,
})(ResetPassword);
