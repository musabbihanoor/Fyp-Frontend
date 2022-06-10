import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Grid, TextField, Button, InputAdornment } from "@material-ui/core";
import { AccountCircle, LockRounded } from "@material-ui/icons";

import { login } from "../../actions/auth";

const Login = ({ setRegister, login, auth: { error }, history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const error = {
  // username: ["This field is required."],
  // password: ["This field is required."],
  // detail: "No active account found with the given credentials",
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 400,
          minWidth: 300,
          marginTop: 100,
        }}
      >
        <Grid container justify='center'>
          <img
            src='https://www.pngfind.com/pngs/b/527-5272118_bismillah-calligraphy-png.png'
            width={100}
            alt='logo'
          ></img>
        </Grid>
        <TextField
          error={error.username}
          id={error.username ? "outlined-error-helper-text" : "outlined-basic"}
          helperText={error.username && error.username[0]}
          label='Username'
          variant='outlined'
          margin='normal'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AccountCircle color='primary' />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          error={error.password}
          id={error.password ? "outlined-error-helper-text" : "outlined-basic"}
          helperText={error.password && error.password[0]}
          label='Password'
          variant='outlined'
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <LockRounded color='primary' />
              </InputAdornment>
            ),
          }}
        />

        {error.detail && (
          <p style={{ color: "#f44336", textAlign: "center" }}>
            {error.detail}
          </p>
        )}

        <div style={{ height: 20 }}>
          <Button
            color='primary'
            width='100%'
            variant='contained'
            href='/timeline'
            onClick={(e) => onSubmit(e)}
          >
            Login
          </Button>
        </div>
        <div style={{ height: 20, marginTop: 30 }}>
          Interested in joining?{" "}
          <Button onClick={() => setRegister(true)}>Register</Button>
        </div>
      </div>
      <div>
        <Grid container justify='center' spacing={2}>
          <Grid item>
            <Button color='primary'>Go to community page</Button>
          </Grid>
          <Grid item>
            <Button variant='outlined'>Forgot password?</Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { login })(Login);
