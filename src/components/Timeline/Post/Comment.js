import React, { Fragment } from "react";
import Loading from "../../Layout/Loading";
import { Delete } from "@material-ui/icons";

const Comment = ({ comment, deleteComment, user }) => {
  return (
    <Fragment>
      {comment ? (
        <div className="comment">
          <div className="user-info">
            <img
              alt="profile"
              src={
                comment.profile.profile_picture
                  ? comment.profile.profile_picture
                  : "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
              }></img>
            <div
              style={{
                width: "70%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <div>
                <h5 style={{ marginBottom: 10 }}>{comment.profile.name}</h5>
                <h6 style={{ margin: 0, fontWeight: 300 }}>{comment.text}</h6>
              </div>
              {user && user.id === comment.profile.id && (
                <h6
                  style={{ margin: 0, color: "red", cursor: "pointer" }}
                  onClick={(e) => deleteComment(e, comment.id)}>
                  <Delete />
                </h6>
              )}
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
