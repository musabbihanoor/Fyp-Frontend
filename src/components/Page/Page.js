import React, { Fragment } from "react";
import { Grid, Button } from "@material-ui/core";
import {
  LocationOn,
  Email,
  Phone,
  Settings,
  ThumbUpAltTwoTone,
  InfoTwoTone,
  FileCopyTwoTone,
} from "@material-ui/icons";
import Posts from "../Timeline/Post/Posts";

const Page = () => {
  return (
    <Fragment>
      <div className="profile">
        <img
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
          }}
          alt="cover"
          src="https://icsb.org/wp-content/uploads/membership-profile-uploads/profile_image_placeholder.png"
        />
        <Button
          variant="contained"
          style={{
            position: "absolute",
            top: 450,
            right: 50,
            zIndex: "10000",
          }}>
          Upload
        </Button>
        <Grid container justifyContent="center" className="profile-head">
          <Grid item>
            <img
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
              src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
            />
          </Grid>
          <Grid item>
            <div>
              <h2 className="name">Page name</h2>
              <h4>This is my description</h4>
              <Grid container>
                <Grid item>
                  <Button
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}>
                    <LocationOn />
                    <span>Karachi</span>
                    <span>Pakistan</span>
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
                    musabbihanoor33@gmail.com
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
                    0321 227 3638
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item>
            <Button href="/profile/setting">
              <Settings />
            </Button>
          </Grid>
        </Grid>

        <Grid container style={{ marginTop: 50 }}>
          <Grid item xs={5}>
            <div className="about">
              <h3>About</h3>
              <p>
                <InfoTwoTone style={{ color: "#8C939D" }} />
                This is page that share different posts good posts very nice
                posts
              </p>
              <p>
                <ThumbUpAltTwoTone style={{ color: "#8C939D" }} />
                347 people like this page
              </p>
              <p>
                <FileCopyTwoTone style={{ color: "#8C939D" }} />
                This is a comedy page
              </p>
            </div>
            <div className="profile-friends">
              <h3>Followers</h3>
              <Grid container>
                <Grid item xs={4} className="item">
                  <img
                    alt="cover"
                    src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
                  <p>User name</p>
                </Grid>
              </Grid>
            </div>
            <div className="profile-photos">
              <h3>Photos</h3>
              <Grid container>
                <Grid item xs={4} className="item">
                  <img
                    alt="cover"
                    src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
                </Grid>
                <Grid item xs={4} className="item">
                  <img
                    alt="cover"
                    src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
                </Grid>
                <Grid item xs={4} className="item">
                  <img
                    alt="cover"
                    src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
                </Grid>
                <Grid item xs={4} className="item">
                  <img
                    alt="cover"
                    src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
                </Grid>
                <Grid item xs={4} className="item">
                  <img
                    alt="cover"
                    src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"></img>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={7}>
            <Posts userid="2f4167b7-348a-45f1-9c19-81c04442e81d" />
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default Page;
