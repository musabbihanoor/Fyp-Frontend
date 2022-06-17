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
import Confirm from "../Popup/Confirm";
import Error from "../Popup/Error";

import {
  getProfile,
  getEducations,
  getExperience,
  updateProfile,
  acceptFriendRequest,
  createFriendRequest,
  cancelFriendRequest,
  unfriend,
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
  cancelFriendRequest,
  unfriend,
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
  const [showImage, setShowImage] = useState(null);
  const [showMenu1, setShowMenu1] = useState(false);
  const [showMenu2, setShowMenu2] = useState(false);
  const [noImage, setNoImage] = useState(false);
  const [noCover, setNoCover] = useState(false);
  const [error, setError] = useState("");

  const onCoverChange = (e) => {
    e.preventDefault();
    setShowMenu2(false);
    var binaryData = [];
    binaryData.push(e.target.files[0]);
    setShowCover(
      window.URL.createObjectURL(
        new Blob(binaryData, { type: "application/zip" }),
      ),
    );
    var formData = new FormData();
    formData.append("cover_picture", e.target.files[0]);
    formData.append("cover_picture2", e.target.files[0]);
    updateProfile(formData, user.id).then((res) => {
      if (res.status === 400) {
        setError(
          res.data.Text && res.data.Text.result.hatespeech
            ? `Your post contain hatespeech "${res.data.result.hatespeech}"`
            : res.data.Text && res.data.Text.result.islamophobia
            ? "Your post contain islamophobia"
            : res.data.hijab
            ? "You can not post pictures without hijab"
            : res.data.info
            ? "You can not post cover pictures with faces"
            : res.data.violence_nudity && res.data.violence_nudity.nudity
            ? "Your post contain nudity"
            : "There's something wrong with your post",
        );
      }
      if (res.status === 500 || res.status === 503) {
        setError("The server isn't working");
      }
    });
  };

  const unfriending = () => {
    setLoading(true);
    unfriend(profile.id).then((res) => {
      setPop("unfriended");
      setLoading(false);
    });
  };

  const acceptRequest = () => {
    setLoading(true);
    acceptFriendRequest(profile.id, "accept").then((res) => {
      setPop("Friend Request Accepted");
      setLoading(false);
    });
  };

  const rejectRequest = () => {
    setLoading(true);
    acceptFriendRequest(profile.id, "reject").then((res) => {
      setPop("Friend Request Rejected");
      setLoading(false);
    });
  };

  const cancelRequest = () => {
    setLoading(true);
    cancelFriendRequest(profile.id).then((res) => {
      setPop("Friend Request Cancelled");
      setLoading(false);
    });
  };

  const addFriend = async () => {
    setLoading(true);
    createFriendRequest(profile.id).then((res) => {
      setPop("Friend Request Sent");
      setLoading(false);
    });
  };

  const changeImage = (e) => {
    e.preventDefault();
    setShowMenu1(false);
    var binaryData = [];
    binaryData.push(e.target.files[0]);
    setShowImage(
      window.URL.createObjectURL(
        new Blob(binaryData, { type: "application/zip" }),
      ),
    );
    var formData = new FormData();
    formData.append("profile_picture", e.target.files[0]);
    formData.append("profile_picture2", e.target.files[0]);
    updateProfile(formData, user.id).then((res) => {
      if (res.status === 400) {
        setError(
          res.data.result.hatespeech
            ? `Your post contain hatespeech "${res.data.result.hatespeech}"`
            : res.data.result.islamophobia
            ? "Your post contain islamophobia"
            : res.data.hijab
            ? "You can not post pictures without hijab"
            : res.data.info
            ? "You can not post pictures with multiple faces"
            : res.data.violence_nudity && res.data.violence_nudity.nudity
            ? "Your post contain nudity"
            : "There's something wrong with your post",
        );
      }
      if (res.status === 500 || res.status === 503) {
        setError("The server isn't working");
      }
    });
  };

  const removeImage = (e) => {
    var formData = new FormData();
    formData.append("profile_picture", "");
    formData.append("profile_picture2", "");
    updateProfile(formData, user.id);
    setNoImage(false);
    setShowMenu1(false);
    setShowImage(
      "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg",
    );
  };

  const removeCover = (e) => {
    var formData = new FormData();
    formData.append("cover_picture", "");
    formData.append("cover_picture2", "");
    updateProfile(formData, user.id);
    setShowMenu2(false);
    setNoCover(false);
    setShowCover(
      "https://icsb.org/wp-content/uploads/membership-profile-uploads/profile_image_placeholder.png",
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
              showCover
                ? showCover
                : profile.cover_picture
                ? profile.cover_picture
                : "https://icsb.org/wp-content/uploads/membership-profile-uploads/profile_image_placeholder.png"
            }
          />
          {profile.id === auth.user.id && (
            <div className="menu" style={{ position: "relative" }}>
              <Button
                onClick={() => setShowMenu2(!showMenu2)}
                variant="contained"
                style={{
                  position: "absolute",
                  top: "-100px",
                  right: 50,
                }}>
                <label
                  style={{
                    cursor: "pointer",
                  }}>
                  Upload
                </label>
              </Button>
              {showMenu2 && (
                <div className="list" style={{ top: "-60px", right: 50 }}>
                  <label>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => onCoverChange(e)}
                    />
                    Upload cover
                  </label>
                  <button
                    className={
                      !showCover && !profile.cover_picture && "disabled"
                    }
                    onClick={() =>
                      (showCover || profile.cover_picture) && setNoCover(true)
                    }>
                    Remove cover
                  </button>
                </div>
              )}
            </div>
          )}
          <Grid container justifyContent="center" className="profile-head">
            <Grid item style={{ position: "relative" }}>
              <img
                onClick={() =>
                  (showImage || profile.profile_picture) &&
                  setShowProfilePic(true)
                }
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "300px",
                  margin: "-100px 50px 0 0",
                  border: "1px solid grey",
                  padding: 3,
                  background: "#fff",
                  cursor: showImage && "pointer",
                }}
                alt="profile"
                src={
                  showImage
                    ? showImage
                    : profile.profile_picture
                    ? profile.profile_picture
                    : "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
                }
              />
              {profile.id === auth.user.id && (
                <div className="menu">
                  <button
                    onClick={() => setShowMenu1(!showMenu1)}
                    style={{
                      position: "absolute",
                      left: 10,
                      bottom: 10,
                      backgroundColor: "rgba(255,255,255,0.7)",
                      border: "none",
                      padding: 10,
                      borderRadius: 50,
                    }}>
                    <AddAPhoto />
                  </button>
                  {showMenu1 && (
                    <div className="list">
                      <label>
                        <input
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) => changeImage(e)}
                        />
                        Upload picture
                      </label>
                      <button
                        className={
                          !showImage && !profile.profile_picture && "disabled"
                        }
                        onClick={() =>
                          (showImage || profile.profile_picture) &&
                          setNoImage(true)
                        }>
                        Remove picture
                      </button>
                    </div>
                  )}
                </div>
              )}
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
                      {profile.city && <span>{profile.city + ", "}</span>}
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
                <Button variant="contained" onClick={() => unfriending()}>
                  <Cancel /> Unfriend
                </Button>
              ) : auth.user.request_list.find((x) => x.id === profile.id) ? (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => acceptRequest()}>
                    Accept Request
                  </Button>
                  <Button
                    style={{ marginLeft: 10 }}
                    variant="outlined"
                    color="secondary"
                    onClick={() => rejectRequest()}>
                    Reject Request
                  </Button>
                </>
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
        <Image src={showImage} setShowImage={setShowProfilePic} />
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

      {noImage && (
        <Confirm
          heading="Do you want to remove profile picture?"
          accept={(e) => removeImage(e)}
          decline={() => setNoImage(false)}
        />
      )}
      {noCover && (
        <Confirm
          heading="Do you want to remove cover picture?"
          accept={(e) => removeCover(e)}
          decline={() => setNoCover(false)}
        />
      )}

      {error !== "" && (
        <Error
          func={() => {
            setError("");
            history.go();
          }}
          text={error}
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
  cancelFriendRequest: PropTypes.func.isRequired,
  unfriend: PropTypes.func.isRequired,
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
  cancelFriendRequest,
  unfriend,
})(withRouter(Profile));
