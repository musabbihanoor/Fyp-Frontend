import React, { useEffect, Fragment, useState } from "react";
import {
  Redirect,
  withRouter,
  useLocation,
  useHistory,
} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Grid, Button } from "@material-ui/core";
import {
  LocationOn,
  Email,
  Phone,
  Settings,
  Cancel,
  FiberManualRecord,
  AddAPhoto,
} from "@material-ui/icons";
import Loading from "../Layout/Loading";

import {
  getProfile,
  getEducations,
  getExperience,
  updateProfile,
  acceptFriendRequest,
  createFriendRequest,
} from "../../actions/profile";

import ProfilePosts from "./ProfilePosts";
import ProfileAbout from "./ProfileAbout";
import ProfileFriends from "./ProfileFriends";
import Image from "../Layout/Image";
import VerseList from "./VerseList";
import Popup from "../Popup/Popup";
import "./Profile.css";

const Profile = ({
  auth: { isAuthenticated },
  auth,
  getProfile,
  getEducations,
  getExperience,
  updateProfile,
  profile: { profile, educations, experiences },
  createFriendRequest,
  acceptFriendRequest,
}) => {
  const location = useLocation();
  const history = useHistory();
  const { user } = location.state;
  const [showProfilePic, setShowProfilePic] = useState(false);
  const [nav, setNav] = useState(1);
  const [showVerse, setShowVerse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCover, setShowCover] = useState(null);
  const [pop, setPop] = useState("");

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

  const unfriend = () => {};

  const acceptRequest = () => {
    acceptFriendRequest(profile.id, "accept").then((res) =>
      setPop("Friend Request Accepted"),
    );
  };

  // const rejectRequest = () => {
  //   acceptFriendRequest(profile.id, "reject").then((res) =>
  //     setPop("Friend Request Rejected"),
  //   );
  // };

  const cancelRequest = () => {};

  const addFriend = async () => {
    createFriendRequest(profile.id).then((res) =>
      setPop("Friend Request Sent"),
    );
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
              profile.cover_picture
                ? profile.cover_picture
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
          <Grid
            container
            justifyContent="center"
            className="profile-head"
            style={{ position: "relative" }}>
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
              {/* <button style={{ position: "absolute" }}>
                <AddAPhoto />
              </button> */}
            </Grid>
            <Grid item>
              <div>
                <h2 className="name">
                  {profile.name}
                  {auth.user.friend_list.find((x) => x.id === profile.id) && (
                    <>
                      <span
                        style={{
                          color: "#F50057",
                          fontSize: 12,
                          fontWeight: "300",
                          marginLeft: 10,
                        }}>
                        <FiberManualRecord
                          style={{
                            fontSize: 12,
                          }}
                        />
                        Friends
                      </span>
                    </>
                  )}
                </h2>
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
                      <Phone />+{profile.contact_number}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid
              item
              style={{ alignSelf: "flex-end", margin: "0 0 10px 200px" }}>
              {profile.id === auth.user.id ? (
                <Button href="/profile/setting" variant="contained">
                  <Settings /> Edit
                </Button>
              ) : auth.user.friend_list.find((x) => x.id === profile.id) ? (
                <Button variant="contained" onClick={() => unfriend()}>
                  <Cancel /> Unfriend
                </Button>
              ) : auth.user.request_list.find((x) => x.id === profile.id) ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => acceptRequest()}>
                  Accept Request
                </Button>
              ) : profile.request_list.find((x) => x.id === auth.user.id) ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => cancelRequest()}>
                  Cancel Request
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addFriend()}>
                  Add Friend
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
              // setShowVerse={setShowVerse}
              setLoading={setLoading}
              educations={educations}
              experiences={experiences}
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

      {pop !== "" && (
        <Popup
          func={() => {
            setPop("");
            history.go();
          }}
          heading={pop}
        />
      )}
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
  createFriendRequest: PropTypes.func.isRequired,
  acceptFriendRequest: PropTypes.func.isRequired,
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
  createFriendRequest,
  acceptFriendRequest,
})(withRouter(Profile));
