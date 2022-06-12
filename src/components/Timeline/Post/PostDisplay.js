import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import Comment from "./Comment";
import DisplayLikes from "./DisplayLikes";

const PostDisplay = ({
  post: { body, image_set, id, profileid },
  post,
  user,
  setDisplayPost,
  likes,
  setLikes,
  createPostReactions,
  deletePostReactions,
  createPostComment,
  comments,
  setComments,
  deletePostComment,
  translation,
  tags,
}) => {
  const [currentLike, setCurrentLike] = useState(null);
  const [displayLikes, setDisplayLikes] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState(false);
  const [translate, setTranslate] = useState("");
  // const [tag, setTag] = useState([]);

  const translating = (body) => {
    translation({
      text: body,
      dest: "ur",
    }).then((res) => {
      console.log(res);
      setTranslate(res.data.output);
    });
  };

  // const fetchingTag = (body) => {
  //   tags({ text: body }).then((res) => {
  //     console.log(res);
  //     setTag(res.data.tags.Tags);
  //   });
  // };

  const like = () => {
    createPostReactions({ text: "1", postid: id }).then((res) => {
      setCurrentLike(res);
      setLikes([...likes, res]);
    });
  };

  const dislike = (e) => {
    e.preventDefault();
    deletePostReactions(currentLike.id);
    setCurrentLike(null);
    setLikes(likes.filter((x) => x.id !== currentLike.id));
  };

  const deleteComment = (e, cid) => {
    e.preventDefault();
    deletePostComment(cid);
    setComments(comments.filter((x) => x.id !== cid));
  };

  const submitComment = (e) => {
    e.preventDefault();

    if (commentText !== "") {
      createPostComment({ text: commentText, postid: id }).then((res) => {
        setComments([res, ...comments]);
        setCommentText("");
        setCommentError(false);
      });
    } else {
      setCommentError(true);
    }
  };

  useEffect(() => {
    const data = likes.find((x) => x.profile.id === user.id);
    likes && data !== undefined && setCurrentLike(data);
    // post && fetchingTag(post.body);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="absolute">
      <div
        className="absolute-content margin100"
        style={{ width: !image_set && "50%" }}>
        <button
          className="absolute-close"
          onClick={() => setDisplayPost(false)}>
          <i className="fas fa-times"></i>
        </button>
        <Grid container>
          <Grid item xs={12} sm={6}>
            {image_set && (
              <img
                src={image_set}
                style={{ width: "100%", height: "600px", objectFit: "cover" }}
                alt="brand"></img>
            )}
          </Grid>

          <Grid
            container
            item
            xs={image_set && 12}
            sm={image_set && 6}
            style={{ padding: "10px 20px" }}
            direction="column">
            <div className="user-info">
              <img alt="profile" src={profileid.profile_picture}></img>
              <h1>{profileid.name}</h1>
            </div>
            <p>{body}</p>
            {/* <div className="tags">
              {tag.map((x, i) => (
                <h4 className="tag" key={i}>
                  #{x}
                </h4>
              ))}
            </div> */}
            <h5 className="translated">{translate !== "" && translate}</h5>
            <h6 className="translate" onClick={() => translating(body)}>
              Translate
            </h6>
            <div className="post-options">
              {currentLike ? (
                <button
                  style={{
                    backgroundColor: "#bd3922",
                    color: "white",
                    width: 80,
                  }}
                  onClick={(e) => dislike(e)}>
                  <i className="fa fa-heart "></i> Liked
                </button>
              ) : (
                <button
                  className="hover-red"
                  style={{ width: 80 }}
                  onClick={() => like()}>
                  <i className="fa fa-heart "></i> Like
                </button>
              )}
            </div>
            {likes && (
              <p
                style={{ cursor: "pointer" }}
                onClick={() => setDisplayLikes(true)}>
                {likes.length} likes
              </p>
            )}
            <hr />
            <div className="comments">
              <h3 style={{ margin: 0 }}>Comments</h3>
              <form
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  width: "95%",
                }}>
                <TextField
                  error={commentError}
                  id={commentError ? "error-helper-text" : "basic"}
                  helperText={commentError && "Add a comment"}
                  variant="standard"
                  margin="normal"
                  fullWidth
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Enter a comment"
                />
                <button
                  onClick={(e) => submitComment(e)}
                  style={{ color: "#3F51B5" }}>
                  <Send />
                </button>
              </form>
              {comments &&
                comments.length > 0 &&
                comments.map((x, i) => (
                  <Comment
                    key={i}
                    comment={x}
                    deleteComment={deleteComment}
                    user={user}
                  />
                ))}
            </div>
          </Grid>
        </Grid>
      </div>
      {displayLikes && (
        <DisplayLikes setDisplayLikes={setDisplayPost} likes={likes} />
      )}
    </div>
  );
};

export default PostDisplay;
