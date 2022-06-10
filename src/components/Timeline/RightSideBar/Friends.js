import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Friends = ({ user }) => {
  return (
    <Fragment>
      <h3>Friends</h3>
      {user &&
        user.friend_list.map((x, i) => (
          <Link to={{ pathname: "/profile", state: { user: x } }} key={i}>
            <div className="user-info">
              <img
                src={
                  x.profile_picture
                    ? x.profile_picture
                    : "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
                }></img>
              <h1>{x.name}</h1>
            </div>
          </Link>
        ))}
    </Fragment>
  );
};

export default Friends;
