import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import {
  AccountCircle,
  LockRounded,
  Email,
  Phone,
  LocationOn,
} from "@material-ui/icons";

import { register } from "../../actions/auth";

const Register = ({ setRegister, auth: { error }, register }) => {
  // const error = {
  // username: ["This field is required."],
  // email: ["This field is required."],
  // password: ["This field is required."],
  // password2: ["This field is required."],
  // name: ["This field is required."],
  // contact_number: ["This field is required."],
  // country: ["This field is required."],
  // gender: ["This field is required."],
  // };

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    contact_number: "",
    gender: "",
    password: "",
    password2: "",
    country: "",
  });

  const {
    name,
    username,
    email,
    contact_number,
    gender,
    password,
    password2,
    country,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    register(formData);
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
          marginTop: 20,
          marginBottom: 20,
        }}>
        <h1>Sign up</h1>

        <TextField
          error={error.name}
          id={error.name ? "outlined-error-helper-text" : "outlined-basic"}
          helperText={error.name && error.name[0]}
          label="Name"
          variant="outlined"
          margin="normal"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle color="primary" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          error={error.username}
          id={error.username ? "outlined-error-helper-text" : "outlined-basic"}
          helperText={error.username && error.username[0]}
          label="Username"
          variant="outlined"
          margin="normal"
          name="username"
          value={username}
          onChange={(e) => onChange(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle color="primary" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          error={error.email}
          id={error.email ? "outlined-error-helper-text" : "outlined-basic"}
          helperText={error.email && error.email[0]}
          label="Email"
          variant="outlined"
          margin="normal"
          name="email"
          value={email}
          type="email"
          onChange={(e) => onChange(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="primary" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          error={error.contact}
          id={error.contact ? "outlined-error-helper-text" : "outlined-basic"}
          helperText={error.contact && error.contact[0]}
          label="Phone"
          variant="outlined"
          margin="normal"
          name="contact_number"
          value={contact_number}
          onChange={(e) => onChange(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone color="primary" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          error={error.country}
          id={error.country ? "outlined-error-helper-text" : "outlined-basic"}
          helperText={error.country && error.country[0]}
          label="Country"
          variant="outlined"
          margin="normal"
          name="country"
          value={country}
          onChange={(e) => onChange(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn color="primary" />
              </InputAdornment>
            ),
          }}
        />

        <FormControl
          variant="outlined"
          style={{ width: "86%" }}
          margin="normal"
          error={error.gender}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Gender
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id={
              error.gender
                ? "demo-simple-select-error"
                : "demo-simple-select-autowidth"
            }
            label="Gender"
            name="gender"
            value={gender}
            onChange={(e) => onChange(e)}>
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
          <FormHelperText>{error.gender && error.gender[0]}</FormHelperText>
        </FormControl>

        <TextField
          type="password"
          error={error.password}
          id={error.password ? "outlined-error-helper-text" : "outlined-basic"}
          helperText={error.password && error.password[0]}
          label="Password"
          variant="outlined"
          margin="normal"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockRounded color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          type="password"
          error={error.password2}
          id={error.password2 ? "outlined-error-helper-text" : "outlined-basic"}
          helperText={error.password2 && error.password2[0]}
          label="Confirm Password"
          variant="outlined"
          margin="normal"
          name="password2"
          value={password2}
          onChange={(e) => onChange(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockRounded color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <div style={{ height: 20 }}>
          <Button
            href="/timeline"
            color="primary"
            width="100%"
            variant="contained"
            onClick={(e) => onSubmit(e)}>
            Submit
          </Button>
        </div>
        <div style={{ height: 20, marginTop: 30 }}>
          Already a user?{" "}
          <Button onClick={() => setRegister(false)}>Login</Button>
        </div>
      </div>
      <div>
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <Button color="primary">Go to community page</Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { register })(Register);
