import React, { useEffect, Fragment, useState } from "react";
import { Redirect, withRouter, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Grid, Button } from "@material-ui/core";
import { LocationOn, Email, Phone, Settings } from "@material-ui/icons";
import Loading from "../Layout/Loading";

import {
  getProfile,
  getEducations,
  getExperience,
  updateProfile,
} from "../../actions/profile";

import ProfilePosts from "./ProfilePosts";
import ProfileAbout from "./ProfileAbout";
import ProfileFriends from "./ProfileFriends";
import Image from "../Layout/Image";
import "./Profile.css";
import VerseList from "./VerseList";

const Profile = ({
  auth: { isAuthenticated },
  auth,
  getProfile,
  getEducations,
  getExperience,
  updateProfile,
  profile: { profile, educations, experiences },
}) => {
  const location = useLocation();
  const { user } = location.state;
  const [showProfilePic, setShowProfilePic] = useState(false);
  const [nav, setNav] = useState(1);
  const [showVerse, setShowVerse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCover, setShowCover] = useState(null);

  const onCoverChange = (e) => {
    e.preventDefault();
    var binaryData = [];
    binaryData.push(e.target.files[0]);
    setShowCover(
      window.URL.createObjectURL(
        new Blob(binaryData, { type: "application/zip" }),
      ),
    );
    var formData = new FormData();
    formData.append("cover_picture", e.target.files[0]);
    updateProfile(formData, user.id).then((res) => console.log(res));
  };

  useEffect(() => {
    // Redirect if logged out
    if (!isAuthenticated && !auth.loading) {
      return <Redirect to="/" />;
    } else {
      setLoading(true);
      getProfile(user.id).then((res) => setLoading(false));
      getEducations();
      getExperience();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, auth.loading]);

  return (
    <Fragment>
      {!auth.loading && profile && !loading && (
        <div className="profile">
          <img
            style={{
              width: "100%",
              height: "500px",
              objectFit: "cover",
            }}
            alt="cover"
            src={
              profile.cover
                ? profile.cover
                : showCover
                ? showCover
                : "https://icsb.org/wp-content/uploads/membership-profile-uploads/profile_image_placeholder.png"
            }
          />
          {profile.id === auth.user.id && (
            <Button
              variant="contained"
              style={{
                position: "absolute",
                top: 450,
                right: 50,
              }}>
              <label
                style={{
                  cursor: "pointer",
                }}>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => onCoverChange(e)}
                />
                Upload
              </label>
            </Button>
          )}
          <Grid container justifyContent="center" className="profile-head">
            <Grid item>
              <img
                onClick={() => setShowProfilePic(true)}
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "300px",
                  margin: "-100px 50px 0 0",
                  border: "1px solid grey",
                  padding: 3,
                  background: "#fff",
                  cursor: "pointer",
                }}
                alt="profile"
                src={
                  profile.profile_picture
                    ? profile.profile_picture
                    : "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
                }
              />
            </Grid>
            <Grid item>
              <div>
                <h2 className="name">{profile.name}</h2>
                <Grid container>
                  <Grid item>
                    <Button
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}>
                      <LocationOn />
                      {profile.city && <span>{profile.city}</span>}
                      <span>{profile.country}</span>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        display: "flex",
                        marginLeft: 15,
                        alignItems: "center",
                      }}>
                      <Email />
                      {profile.email}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        display: "flex",
                        marginLeft: 15,
                        alignItems: "center",
                      }}>
                      <Phone />
                      {profile.contact_number}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid
              item
              style={{ alignSelf: "flex-end", margin: "0 0 10px 200px" }}>
              {profile.id === auth.user.id && (
                <Button href="/profile/setting" variant="contained">
                  <Settings /> Edit
                </Button>
              )}
            </Grid>
          </Grid>

          <div className="nav">
            <button
              className={`${nav === 1 && "selected"}`}
              onClick={() => setNav(1)}>
              Posts
            </button>
            <button
              className={`${nav === 2 && "selected"}`}
              onClick={() => setNav(2)}>
              About
            </button>
            <button
              className={`${nav === 3 && "selected"}`}
              onClick={() => setNav(3)}>
              Friends
            </button>
          </div>

          {nav === 1 && (
            <ProfilePosts
              profile={profile}
              getProfile={getProfile}
              setShowVerse={setShowVerse}
              setLoading={setLoading}
            />
          )}
          {nav === 2 && (
            <ProfileAbout
              profile={profile}
              educations={educations}
              experiences={experiences}
            />
          )}
          {nav === 3 && (
            <ProfileFriends
              profile={profile}
              getProfile={getProfile}
              setLoading={setLoading}
              setNav={setNav}
            />
          )}
        </div>
      )}

      {showProfilePic && (
        <Image
          src={user.profile_picture && user.profile_picture}
          setShowImage={setShowProfilePic}
        />
      )}

      {showVerse && <VerseList setShowVerse={setShowVerse} />}

      {loading && <Loading />}
    </Fragment>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  getEducations: PropTypes.func.isRequired,
  getExperience: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getProfile,
  getEducations,
  getExperience,
  updateProfile,
})(withRouter(Profile));
