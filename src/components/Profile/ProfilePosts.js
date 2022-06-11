import React, { useState } from "react";
import Posts from "../Timeline/Post/Posts";
import { Grid } from "@material-ui/core";
import { Edit, MoreHoriz } from "@material-ui/icons";

const ProfilePosts = ({ profile, getProfile, setShowVerse, setLoading }) => {
  const [data, setData] = useState([]);

  return (
    <Grid container style={{ marginTop: 50 }} className="profile-post">
      <Grid item xs={5} className="profile-post-right">
        <div className="quote">
          <h3>Verse of the day</h3>
          <button
            variant="contained"
            className="option"
            onClick={() => setShowVerse(true)}>
            <Edit />
          </button>
          <p>
            Surely this Quran guides to that which is most upright and gives
            good news to the believers who do good that they shall have a great
            reward. And that (as for) those who do not believe in the Hereafter,
            We have prepared for them a painful chastisement.
          </p>
          <h6>- The Holy Quran, Sura 17-9/10</h6>
        </div>
        <div className="profile-friends">
          <h3>Friends</h3>
          <button variant="contained" className="option">
            <MoreHoriz />
          </button>
          <Grid container>
            {profile.friend_list.length > 0 &&
              profile.friend_list.map((x) => (
                <Grid
                  item
                  xs={4}
                  className="item"
                  onClick={() => {
                    setLoading(true);
                    getProfile(x.id).then((res) => setLoading(false));
                  }}>
                  <img
                    alt="profile"
                    src={
                      x.profile_picture
                        ? x.profile_picture
                        : "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
                    }></img>
                  <p>{x.name.split(" ")[0]}</p>
                </Grid>
              ))}
          </Grid>
        </div>
        <div className="profile-photos">
          <h3>Photos</h3>
          <button variant="contained" className="option">
            <MoreHoriz />
          </button>
          <Grid container>
            <Grid item xs={4} className="item">
              <img
                alt="profile"
                src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
            </Grid>
            <Grid item xs={4} className="item">
              <img
                alt="profile"
                src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
            </Grid>
            <Grid item xs={4} className="item">
              <img
                alt="profile"
                src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
            </Grid>
            <Grid item xs={4} className="item">
              <img
                alt="profile"
                src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
            </Grid>
            <Grid item xs={4} className="item">
              <img
                alt="profile"
                src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item xs={7} className="profile-post-left">
        <Posts userid={profile.id} data={data} setData={setData} />
      </Grid>
    </Grid>
  );
};

export default ProfilePosts;
