import React from "react";

const DisplayLikes = ({ setDisplayLikes, likes }) => {
  return (
    <div className="absolute ">
      <div className="absolute-content margin100" style={{ width: 300 }}>
        <button
          className="absolute-close"
          onClick={() => setDisplayLikes(false)}>
          <i className="fas fa-times"></i>
        </button>
        <h1>Liked by</h1>
        {likes &&
          likes.map((x) => (
            <div className="user-info">
              <img alt="profile" src={x.profile.profile_picture}></img>
              <h1>{x.profile.name}</h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DisplayLikes;
