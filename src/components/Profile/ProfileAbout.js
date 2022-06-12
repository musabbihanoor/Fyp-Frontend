import React, { useState } from "react";
import {
  CakeTwoTone,
  PersonOutlineTwoTone,
  EmailTwoTone,
  PhoneAndroidTwoTone,
  HomeTwoTone,
  LocationCityTwoTone,
  FlagTwoTone,
  DnsTwoTone,
} from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import moment from "moment";

const ProfileAbout = ({
  profile: {
    name,
    gender,
    email,
    contact_number,
    birth_date,
    home_town,
    city,
    country,
  },
  educations,
  experiences,
}) => {
  const [menu, setMenu] = useState(1);

  return (
    <div className="profile-about">
      <div className="about">
        <h3>About</h3>
        <span>
          <div className="menu">
            <button
              className={`${menu === 1 && "selected"}`}
              onClick={() => setMenu(1)}>
              Overview
            </button>
            <button
              className={`${menu === 2 && "selected"}`}
              onClick={() => setMenu(2)}>
              Work
            </button>
            <button
              className={`${menu === 3 && "selected"}`}
              onClick={() => setMenu(3)}>
              Education
            </button>
          </div>
          <div className="detail">
            {menu === 1 && (
              <div className="overview">
                <div className="item">
                  <DnsTwoTone />
                  <p>{name.split(" ")[0]}</p>
                  <h6>Name</h6>
                </div>
                <div className="item">
                  <PersonOutlineTwoTone />
                  <p>{gender}</p>
                  <h6>Gender</h6>
                </div>
                <div className="item">
                  <EmailTwoTone />
                  <p>{email}</p>
                  <h6>Email</h6>
                </div>
                <div className="item">
                  <PhoneAndroidTwoTone />
                  <p>{contact_number}</p>
                  <h6>Phone</h6>
                </div>
                <div className="item">
                  <CakeTwoTone />
                  <p>{birth_date ? moment(birth_date).format("ll") : "-"}</p>
                  <h6>Birthday</h6>
                </div>
                <div className="item">
                  <HomeTwoTone />
                  <p>{home_town ? home_town : "-"}</p>
                  <h6>Hometown</h6>
                </div>
                <div className="item">
                  <LocationCityTwoTone />
                  <p>{city ? city : "-"}</p>
                  <h6>City</h6>
                </div>
                <div className="item">
                  <FlagTwoTone />
                  <p>{country}</p>
                  <h6>Country</h6>
                </div>
              </div>
            )}

            {menu === 2 && (
              <div className="work">
                {experiences.length > 0 &&
                  experiences.map(
                    (x, i) =>
                      x.visibility === "visible" && (
                        <div className="item">
                          <h4>{x.organization}</h4>
                          <p>{x.job_title}</p>
                          <p style={{ color: "green", fontSize: 12 }}>
                            {x.location}
                          </p>
                          <h6>
                            {moment(x.start).format("ll")} -{" "}
                            {x.work_here ? "now" : moment(x.end).format("ll")}
                          </h6>
                        </div>
                      ),
                  )}
                {experiences.length === 0 && <p>No experience to show.</p>}
              </div>
            )}

            {menu === 3 && (
              <div className="work">
                {educations.length > 0 &&
                  educations.map(
                    (x, i) =>
                      x.visibility === "Visible" && (
                        <div className="item" key={i}>
                          <h4>{x.organization}</h4>
                          <p>{x.education_type}</p>
                          {x.study_here && (
                            <p style={{ color: "green", fontSize: 12 }}>
                              Study Here
                            </p>
                          )}
                          <h6>{x.education_level}</h6>
                        </div>
                      ),
                  )}
                {educations.length === 0 && <p>No education to show.</p>}
              </div>
            )}
          </div>
        </span>
      </div>

      <div className="profile-friends">
        <h3>Groups</h3>
        <Grid container>
          <Grid item xs={2} className="item">
            <img
              alt="display"
              src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
            <p>Group Name</p>
          </Grid>
          <Grid item xs={2} className="item">
            <img
              alt="display"
              src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
            <p>Group Name</p>
          </Grid>
          <Grid item xs={2} className="item">
            <img
              alt="display"
              src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
            <p>Group Name</p>
          </Grid>
          <Grid item xs={2} className="item">
            <img
              alt="display"
              src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
            <p>Group Name</p>
          </Grid>
          <Grid item xs={2} className="item">
            <img
              alt="display"
              src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
            <p>Group Name</p>
          </Grid>
          <Grid item xs={2} className="item">
            <img
              alt="display"
              src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
            <p>Group Name</p>
          </Grid>
        </Grid>
      </div>

      <div className="profile-friends">
        <h3>Liked</h3>
        <Grid container>
          <Grid item xs={2} className="item">
            <img
              alt="display"
              src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
            <p>Page Name</p>
          </Grid>
          <Grid item xs={2} className="item">
            <img
              alt="display"
              src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
            <p>Page Name</p>
          </Grid>
          <Grid item xs={2} className="item">
            <img
              alt="display"
              src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
            <p>Page Name</p>
          </Grid>
          <Grid item xs={2} className="item">
            <img
              alt="display"
              src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
            <p>Page Name</p>
          </Grid>
          <Grid item xs={2} className="item">
            <img
              alt="display"
              src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
            <p>Page Name</p>
          </Grid>
          <Grid item xs={2} className="item">
            <img
              alt="display"
              src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
            <p>Page Name</p>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ProfileAbout;
