import React, { Fragment } from "react";
import Loading from "../../Layout/Loading";

const Comment = ({ comment, deleteComment, user }) => {
  return (
    <Fragment>
      {comment ? (
        <div className="comment">
          <div className="user-info">
            <img alt="profile" src={comment.profile.profile_picture}></img>
            <div
              style={{
                width: "70%",
              }}>
              <h5 style={{ marginBottom: 10 }}>{comment.profile.name}</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                <h6 style={{ margin: 0, fontWeight: 300 }}>{comment.text}</h6>
                {user && user.id === comment.profile.id && (
                  <h6
                    style={{ margin: 0, color: "blue", cursor: "pointer" }}
                    onClick={(e) => deleteComment(e, comment.id)}>
                    Delete
                  </h6>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Fragment>
  );
};

export default Comment;
