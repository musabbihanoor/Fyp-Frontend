import React from "react";

const DisplayLikes = ({ setDisplayLikes, likes, getProfile, setLoading }) => {
  return (
    <div className="absolute ">
      <div className="absolute-content margin100" style={{ width: 500 }}>
        <button
          className="absolute-close"
          onClick={() => setDisplayLikes(false)}>
          <i className="fas fa-times"></i>
        </button>
        <h3>Liked by</h3>
        {likes &&
          likes.map((x) => (
            <div
              className="user-info"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setLoading(true);
                getProfile(x.profile.id).then((res) => setLoading(false));
              }}>
              <img
                alt="profile"
                src={
                  x.profile && x.profile.profile_picture
                    ? x.profile.profile_picture
                    : "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
                }></img>
              <h5>{x.profile && x.profile.name}</h5>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DisplayLikes;
