import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Send } from "@material-ui/icons";
import Comment from "./Comment";
import DisplayLikes from "./DisplayLikes";
import Loading from "../../Layout/Loading";
import Popup from "../../Popup/Popup";

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
  getProfile,
  QuranRef,
  setPopQuran,
  AhadeesRef,
  setPopHadees,
  // translation,
  // tags,
}) => {
  const [currentLike, setCurrentLike] = useState(null);
  const [displayLikes, setDisplayLikes] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState(false);
  const [load, setLoad] = useState(false);
  const [pop, setPop] = useState("");
  // const [translate, setTranslate] = useState("");
  // const [tag, setTag] = useState([]);

  // const translating = (body) => {
  //   translation({
  //     text: body,
  //     dest: "ur",
  //   }).then((res) => {
  //     console.log(res);
  //     setTranslate(res.data.output);
  //   });
  // };

  // const fetchingTag = (body) => {
  //   tags({ text: body }).then((res) => {
  //     console.log(res);
  //     setTag(res.data.tags.Tags);
  //   });
  // };

  const like = () => {
    setLoad(true);
    createPostReactions({ text: "1", postid: id }).then((res) => {
      setCurrentLike(res.data);
      setLikes([...likes, res.data]);
      setLoad(false);
    });
  };

  const dislike = (e) => {
    e.preventDefault();
    setLoad(true);
    deletePostReactions(currentLike.id).then((res) => {
      setCurrentLike(null);
      setLikes(likes.filter((x) => x.id !== currentLike.id));
      setLoad(false);
    });
  };

  const deleteComment = (e, cid) => {
    e.preventDefault();
    setLoad(true);
    deletePostComment(cid).then((res) => {
      setComments(comments.filter((x) => x.id !== cid));
      setLoad(false);
    });
  };

  const submitComment = (e) => {
    e.preventDefault();

    setLoad(true);
    if (commentText !== "") {
      createPostComment({ text: commentText, postid: id }).then((res) => {
        if (res.status === 200 || res.status === 201) {
          setComments([res.data, ...comments]);
          setCommentText("");
          setCommentError(false);
          setLoad(false);
        }

        if (res.status === 400) {
          console.log(res.data);
          setLoad(false);
          setPop(
            res.data.result.hatespeech
              ? `Your post contain hatespeech "${res.data.result.hatespeech}"`
              : res.data.result.islamophobia
              ? "Your post contain islamophobia"
              : "There's something wrong with your post",
          );
        }
      });
    } else {
      setCommentError(true);
    }
  };

  useEffect(() => {
    const data = likes.find((x) => x.profile.id === user.id);
    likes && data !== undefined && setCurrentLike(data);

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
            <Link to={{ pathname: "/profile", state: { user: profileid } }}>
              <div className="user-info">
                <img
                  alt="profile"
                  src={
                    profileid.profile_picture
                      ? profileid.profile_picture
                      : "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
                  }></img>
                <h1>{profileid.name}</h1>
              </div>
            </Link>
            <p>{body}</p>
            {/* <div className="tags">
              {tag.map((x, i) => (
                <h4 className="tag" key={i}>
                  #{x}
                </h4>
              ))}
            </div> */}
            {/* <h5 className="translated">{translate !== "" && translate}</h5> */}
            {/* <h6 className="translate" onClick={() => translating(body)}>
              Translate
            </h6> */}

            <div className="references">
              {QuranRef.length > 0 &&
                QuranRef.map((x, i) => (
                  <p
                    key={i}
                    style={{ cursor: "pointer" }}
                    onClick={() => setPopQuran(x)}>
                    {x.AyahNumber}, {x.SurahName}
                  </p>
                ))}
            </div>
            <div className="references">
              {AhadeesRef.length > 0 &&
                AhadeesRef.map((x, i) => (
                  <p
                    key={i}
                    style={{
                      cursor: "pointer",
                      fontSize: 12,
                      marginTop: 0,
                    }}
                    onClick={() => setPopHadees(x)}>
                    {x.HadithNumber}, {x.BookName}, {x.Sanad}
                  </p>
                ))}
            </div>

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
                style={{ cursor: likes.length > 0 && "pointer" }}
                onClick={() => likes.length > 0 && setDisplayLikes(true)}>
                {likes.length} {likes.length > 1 ? "likes" : "like"}
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
                  style={{
                    color: "#3F51B5",
                    backgroundColor: "transparent",
                    border: "none",
                  }}>
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
                    getProfile={getProfile}
                    setLoading={setLoad}
                    setDisplayPost={setDisplayPost}
                  />
                ))}
            </div>
          </Grid>
        </Grid>
      </div>
      {displayLikes && (
        <DisplayLikes
          setDisplayLikes={setDisplayLikes}
          likes={likes}
          getProfile={getProfile}
          setLoading={setLoad}
        />
      )}

      {pop !== "" && <Popup func={() => setPop("")} heading={pop} />}

      {load && <Loading />}
    </div>
  );
};

export default PostDisplay;
