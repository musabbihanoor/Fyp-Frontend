import React, { useEffect, Fragment } from "react";
import { withRouter, useLocation, useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Grid, Button } from "@material-ui/core";
import {
  PersonTwoTone,
  GroupTwoTone,
  CategoryTwoTone,
} from "@material-ui/icons";

const Group = ({ auth: { isAuthenticated, loading } }) => {
  const history = useHistory();
  const location = useLocation();

  const { group } = location.state;

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      history.push("/");
    }

    console.log(group);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loading]);

  return (
    <Fragment>
      {group && (
        <div className="profile">
          <img
            style={{
              width: "100%",
              height: "500px",
              objectFit: "cover",
            }}
            alt="cover"
            src=
             {group.cover_picture ? group.cover_picture : "https://icsb.org/wp-content/uploads/membership-profile-uploads/profile_image_placeholder.png"}
            
          />

          <Grid container justifyContent="center" className="profile-head">
            <Grid item>
              <div>
                <h2 className="name">{group.name && group.name}</h2>
                <Grid container>
                  <Grid item>
                    <Button
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}>
                      <PersonTwoTone />
                      Admin: {group.username}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        display: "flex",
                        marginLeft: 15,
                        alignItems: "center",
                      }}>
                      <GroupTwoTone />
                      {group.members && group.members.length}{" "}
                      {group.members && group.members.length > 1
                        ? "members"
                        : "member"}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        display: "flex",
                        marginLeft: 15,
                        alignItems: "center",
                      }}>
                      <CategoryTwoTone />
                      {group.category_page && group.category_page.name}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>

          <Grid container style={{ marginTop: 50 }} className="profile-post">
            <Grid item xs={5} className="profile-post-right">
              <div className="quote">
                <h3>Description</h3>
                <p>{group.description}</p>
              </div>
              <div className="profile-friends">
                <h3>Members</h3>

                <Grid container>
                  {group.members.length > 0 &&
                    group.members.map((x) => (
                      <Grid
                        item
                        xs={4}
                        className="item"
                        // onClick={() => {
                        //   setLoading(true);
                        //   getProfile(x.id).then((res) => setLoading(false));
                        // }}
                      >
                        <Link
                          to={{
                            pathname: "/profile",
                            state: { user: x },
                          }}>
                          <img
                            alt="profile"
                            src={
                              x.profile_picture
                                ? x.profile_picture
                                : "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
                            }></img>
                          <p>{x.name.split(" ")[0]}</p>
                        </Link>
                      </Grid>
                    ))}
                </Grid>
              </div>
            </Grid>
            {/* <Grid item xs={7} className="profile-post-left">
          <Posts userid={profile.id} data={data} setData={setData} />
        </Grid> */}
          </Grid>
        </div>
      )}
    </Fragment>
  );
};

Group.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(withRouter(Group));
