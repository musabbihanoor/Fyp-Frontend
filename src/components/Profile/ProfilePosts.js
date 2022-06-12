import React, { useState } from "react";
import Posts from "../Timeline/Post/Posts";
import { Grid } from "@material-ui/core";
import moment from "moment";

const ProfilePosts = ({
  profile,
  getProfile,
  setLoading,
  educations,
  experiences,
}) => {
  const [data, setData] = useState([]);

  return (
    <Grid container style={{ marginTop: 50 }} className="profile-post">
      <Grid item xs={5} className="profile-post-right">
        <div className="quote">
          <h3>Description</h3>
          {/* <button
            variant="contained"
            className="option"
            onClick={() => setShowVerse(true)}>
            <Edit />
          </button> */}
          <p>{profile.description}</p>
          <h6>- {moment(profile.modified).format("ll")}</h6>
        </div>
        <div className="profile-friends">
          <h3>Friends</h3>
          {/* <button variant="contained" className="option">
            <MoreHoriz />
          </button> */}
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
          <h3>Education</h3>

          <div className="work">
            {educations.length > 0 ? (
              educations.map(
                (x, i) =>
                  x.visibility === "Visible" && (
                    <div
                      className="item"
                      key={i}
                      style={{
                        border: "1px solid #eee",
                        padding: 10,
                        marginBottom: 5,
                        borderRadius: 10,
                      }}>
                      <h4 style={{ marginTop: 0 }}>{x.organization}</h4>
                      <p>{x.education_type}</p>
                      {x.study_here && (
                        <p style={{ color: "green", fontSize: 12 }}>
                          Study Here
                        </p>
                      )}
                      <h6 style={{ marginBottom: 0 }}>{x.education_level}</h6>
                    </div>
                  ),
              )
            ) : (
              <p>No education to show!</p>
            )}
          </div>
        </div>

        <div className="profile-photos">
          <h3>Experience</h3>

          <div className="work">
            {experiences.length > 0 &&
              experiences.map(
                (x, i) =>
                  x.visibility === "visible" && (
                    <div
                      className="item"
                      style={{
                        border: "1px solid #eee",
                        padding: 10,
                        borderRadius: 10,
                        marginBottom: 5,
                      }}>
                      <h4 style={{ marginTop: 0 }}>{x.organization}</h4>
                      <p>{x.job_title}</p>
                      <p style={{ color: "green", fontSize: 12 }}>
                        {x.location}
                      </p>
                      <h6 style={{ marginBottom: 0 }}>
                        {moment(x.start).format("ll")} -{" "}
                        {x.work_here ? "now" : moment(x.end).format("ll")}
                      </h6>
                    </div>
                  ),
              )}
          </div>
        </div>
      </Grid>
      <Grid item xs={7} className="profile-post-left">
        <Posts userid={profile.id} data={data} setData={setData} />
      </Grid>
    </Grid>
  );
};

export default ProfilePosts;
