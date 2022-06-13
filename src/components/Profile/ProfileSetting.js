import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Education from "./Education";
import Experience from "./Experience";
import Loading from "../Layout/Loading";

import {
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
} from "@material-ui/core";
import {
  AccountCircle,
  Cancel,
  Edit,
  Check,
  LocationCity,
  LocationOn,
  Home,
  Phone,
} from "@material-ui/icons";

import {
  updateProfile,
  getEducations,
  createEducation,
  deleteEducation,
  updateEducation,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../../actions/profile";

const ProfileSetting = ({
  auth: { isAuthenticated, loading, user },
  profile: { error, educations, experiences },
  updateProfile,
  history,
  getEducations,
  createEducation,
  deleteEducation,
  updateEducation,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
}) => {
  const [image_set, setImage] = useState(null);
  const [showImage, setShowImage] = useState("");
  const [changeImage, setChangeImage] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [load, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    contact_number: "",
    gender: "",
    password: "",
    password2: "",
    country: "",
    description: "",
    home_town: "",
    city: "",
  });

  const {
    name,
    contact_number,
    gender,
    country,
    birth_date,
    description,
    home_town,
    city,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateProfile(formData, user.id).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        history.push({ pathname: "/profile", state: { user: user } });
        setLoading(false);
      }
      if (res.status === 400) {
        setLoading(false);
      }
    });
  };

  const onImageSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    if (image_set !== null) {
      formdata.append("profile_picture", image_set);
    }
    updateProfile(formdata, user.id);
  };

  useEffect(() => {
    // Redirect if logged out
    if (!isAuthenticated && !loading) {
      history.push("/");
    }

    user &&
      setFormData({
        ...formData,
        name: user.name ? user.name : "",
        // email: user.email ? user.email : "",
        contact_number: user.contact_number ? user.contact_number : "",
        gender: user.gender ? user.gender : "",
        country: user.country ? user.country : "",
        birth_date: user.birth_date ? user.birth_date : null,
        description: user.description ? user.description : "",
        home_town: user.home_town ? user.home_town : "",
        city: user.city ? user.city : "",
        username: user.username ? user.username : "",
        password: user.password ? user.password : "",
        password2: user.password2 ? user.password2 : "",
      });

    getEducations();
    getExperience();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loading, user]);

  return (
    <div className="p-body">
      <h1>Profile Setting</h1>
      <form>
        <Grid container>
          <Grid item>
            <p>Basic information regarding user's profile</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}>
              <TextField
                error={error && error.name}
                id={
                  error.name ? "outlined-error-helper-text" : "outlined-basic"
                }
                helperText={error.name && error.name[0]}
                label="Name"
                variant="outlined"
                margin="normal"
                name="name"
                style={{ width: "30%", marginRight: 10 }}
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
              <FormControl
                variant="outlined"
                margin="normal"
                style={{ width: "30%", marginRight: 10 }}
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
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
                <FormHelperText>
                  {error.gender && error.gender[0]}
                </FormHelperText>
              </FormControl>
              <div className="date-input">
                <label>Birthday</label>
                <input
                  name="birth_date"
                  value={birth_date}
                  type="date"
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>

            <TextField
              error={error.description}
              id={
                error.description
                  ? "outlined-error-helper-text"
                  : "outlined-basic"
              }
              helperText={error.description && error.description[0]}
              label="Description"
              variant="outlined"
              margin="normal"
              name="description"
              style={{ width: "100%", marginRight: 10 }}
              value={description}
              onChange={(e) => onChange(e)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Edit color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <p>Information regarding your location. </p>
            <div>
              <TextField
                error={error.country}
                id={
                  error.country
                    ? "outlined-error-helper-text"
                    : "outlined-basic"
                }
                helperText={error.country && error.country[0]}
                label="Country"
                variant="outlined"
                margin="normal"
                name="country"
                style={{ width: "30%", marginRight: 10 }}
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
              <TextField
                error={error.city}
                id={
                  error.city ? "outlined-error-helper-text" : "outlined-basic"
                }
                helperText={error.city && error.city[0]}
                label="City"
                variant="outlined"
                margin="normal"
                name="city"
                style={{ width: "30%", marginRight: 10 }}
                value={city}
                onChange={(e) => onChange(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCity color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                error={error.home_town}
                id={
                  error.home_town
                    ? "outlined-error-helper-text"
                    : "outlined-basic"
                }
                helperText={error.home_town && error.home_town[0]}
                label="Home Town"
                variant="outlined"
                margin="normal"
                name="home_town"
                style={{ width: "30%", marginRight: 10 }}
                value={home_town}
                onChange={(e) => onChange(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <p>
              Personal and mandatory information related to your profile. This
              information can not be left blank for the authenticity of user's
              account.
            </p>
            <div>
              <TextField
                error={error.contact_number}
                id={
                  error.contact_number
                    ? "outlined-error-helper-text"
                    : "outlined-basic"
                }
                helperText={error.contact_number && error.contact_number[0]}
                label="Phone Number"
                variant="outlined"
                margin="normal"
                name="contact_number"
                style={{ width: "30%", marginRight: 10 }}
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
            </div>
            <Button
              onClick={() => setShowEducation(true)}
              color="inherit"
              variant="contained"
              style={{ marginBottom: 10, marginRight: 10 }}>
              Education
            </Button>
            <Button
              onClick={() => setShowExperience(true)}
              color="inherit"
              variant="contained"
              style={{ marginBottom: 10, marginRight: 10 }}>
              Experience
            </Button>
            {user && !user.id_verified && (
              <Button
                href="/verifycnic"
                color="secondary"
                variant="contained"
                style={{ marginBottom: 10 }}>
                Verify Profile
              </Button>
            )}
          </Grid>

          {/* <Grid
            item
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            {user && (
              <img
                src={
                  showImage
                    ? showImage
                    : user.profile_picture
                    ? user.profile_picture
                    : "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
                }
                alt="profile"
                style={{
                  width: 200,
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 100,
                }}
              />
            )}
            {!changeImage ? (
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "10px 0" }}
                startIcon={<Edit />}>
                <label>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setChangeImage(true);
                      setImage(e.target.files[0]);
                      var binaryData = [];
                      binaryData.push(e.target.files[0]);
                      setShowImage(
                        window.URL.createObjectURL(
                          new Blob(binaryData, { type: "application/zip" }),
                        ),
                      );
                    }}
                  />
                  Change
                </label>
              </Button>
            ) : (
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ margin: "10px 0" }}
                  startIcon={<Check />}
                  onClick={(e) => {
                    onImageSubmit(e);
                    setImage(null);
                    setChangeImage(false);
                  }}>
                  Upload
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  style={{ margin: "10px" }}
                  startIcon={<Cancel />}
                  onClick={() => {
                    setShowImage("");
                    setImage(null);
                    setChangeImage(false);
                  }}>
                  Cancel
                </Button>
              </div>
            )}
          </Grid> */}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "10px 0" }}
          onClick={(e) => onSubmit(e)}>
          Submit Change
        </Button>
      </form>
      {showEducation && (
        <Education
          close={setShowEducation}
          educations={educations}
          createEducation={createEducation}
          deleteEducation={deleteEducation}
          updateEducation={updateEducation}
          error={error}
        />
      )}
      {showExperience && (
        <Experience
          close={setShowExperience}
          experiences={experiences}
          createExperience={createExperience}
          updateExperience={updateExperience}
          deleteExperience={deleteExperience}
          error={error}
        />
      )}

      {load && <Loading />}
    </div>
  );
};

ProfileSetting.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
  getEducations: PropTypes.func.isRequired,
  createEducation: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  updateEducation: PropTypes.func.isRequired,
  getExperience: PropTypes.func.isRequired,
  createExperience: PropTypes.func.isRequired,
  updateExperience: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  updateProfile,
  getEducations,
  createEducation,
  deleteEducation,
  updateEducation,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
})(withRouter(ProfileSetting));
