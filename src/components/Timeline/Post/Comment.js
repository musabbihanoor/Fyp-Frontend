import React from "react";

const Comment = ({
  comment: {
    id,
    text,
    profile: { name, profile_picture },
    profile,
  },
  deleteComment,
  user,
}) => {
  return (
    <div className='comment'>
      <div className='user-info'>
        <img src={profile_picture}></img>
        <div
          style={{
            width: "70%",
          }}
        >
          <h5 style={{ marginBottom: 10 }}>{name}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h6 style={{ margin: 0, fontWeight: 300 }}>{text}</h6>
            {user && user.id === profile.id && (
              <h6
                style={{ margin: 0, color: "blue", cursor: "pointer" }}
                onClick={(e) => deleteComment(e, id)}
              >
                Delete
              </h6>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
