import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  deletePost,
  updatePost,
  createPostReactions,
  deletePostReactions,
  getPostReaction,
  getPostComments,
  createPostComment,
  deletePostComment,
} from "../../../actions/post";
import { translation, tags } from "../../../actions/AiModels";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import PostDisplay from "./PostDisplay";
import Confirm from "../../Popup/Confirm";
import Moment from "react-moment";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import axios from "axios";
import Popup from "../../Popup/Popup";

const Post = ({
  post: {
    id,
    body,
    image_set,
    profileid: { name, profile_picture },
    profileid,
    last_modified,
    hadees_ref,
    quranic_ref,
  },
  auth: { user },
  post,
  deletePost,
  updatePost,
  createPostReactions,
  deletePostReactions,
  getPostReaction,
  getPostComments,
  createPostComment,
  deletePostComment,
  translation,
  tags,
  data,
  setData,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [updateText, setUpdateText] = useState("");
  const [displayPost, setDisplayPost] = useState(false);
  const [likes, setLikes] = useState(null);
  const [comments, setComments] = useState(null);
  // const [translate, setTranslate] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [QuranRef, setQuranRef] = useState([]);
  const [AhadeesRef, setAhadeesRef] = useState([]);
  const [popQuran, setPopQuran] = useState(null);
  const [popHadees, setPopHadees] = useState(null);

  const fetchVerseRef = async () => {
    const dataQuran = [];

    quranic_ref &&
      JSON.parse("[" + quranic_ref + "]").map((x) =>
        axios
          .get(`https://apihadeesquran.herokuapp.com/quran/id/${x}`)
          .then((res) => dataQuran.push(res.data[0])),
      );

    setQuranRef(dataQuran);
  };

  const fetchHadeesRef = async () => {
    const dataAhadees = [];

    const tempAhadees = JSON.parse(JSON.parse(hadees_ref));

    tempAhadees &&
      tempAhadees.length > 0 &&
      tempAhadees[0].map((x, i) =>
        axios
          .get(
            `https://apihadeesquran.herokuapp.com/hadees/byId/${tempAhadees[1][i]}/${x}`,
          )
          .then((res) => {
            dataAhadees.push(res.data[0]);
          }),
      );
    setAhadeesRef(dataAhadees);
    // console.log(dataAhadees);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("body", updateText);

    post &&
      updatePost(id, formData).then((res) => {
        setData(data.map((x) => (x.id === res.id ? res : x)));
      });
    setUpdateText("");
    setAnchorEl(null);
  };

  // const translating = (body) => {
  //   translation({
  //     text: body,
  //     dest: "ur",
  //   }).then((res) => {
  //     setTranslate(res.data.output);
  //   });
  // };

  const deleting = () => {
    deletePost(id);
    setData(data.filter((x) => x.id !== id));
  };

  useEffect(() => {
    post && getPostReaction(id).then((res) => setLikes(res));
    post && getPostComments(id).then((res) => setComments(res));

    post && fetchVerseRef();
    post && fetchHadeesRef();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {profileid.id === user.id ||
        (user.friend_list.find((x) => x.id === profileid.id) && (
          <div className="post">
            <div className="inline">
              <div className="user-info">
                <img
                  alt="profile"
                  src={
                    profile_picture
                      ? profile_picture
                      : "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
                  }></img>
                <Link to={{ pathname: "/profile", state: { user: profileid } }}>
                  <div style={{ flexBasis: 1 }}>
                    <h1>{name}</h1>
                    <p>
                      <Moment format="MMMM Do YYYY, h:mm:ss a">
                        {last_modified}
                      </Moment>
                    </p>
                  </div>{" "}
                </Link>

                {updateText === "" && user && user.id === profileid.id && (
                  <div style={{ marginLeft: "auto" }}>
                    <Button
                      id="fade-button"
                      aria-controls={open ? "fade-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}>
                      <MoreVert />
                    </Button>
                    <Menu
                      id="fade-menu"
                      MenuListProps={{
                        "aria-labelledby": "fade-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}>
                      <MenuItem
                        onClick={() => {
                          setConfirm(true);
                          setAnchorEl(null);
                        }}>
                        Delete
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setUpdateText(body);
                          setAnchorEl(null);
                        }}>
                        Edit
                      </MenuItem>
                    </Menu>
                  </div>
                )}
              </div>
            </div>
            <div className="post-items">
              {post && updateText !== "" && (
                <form onSubmit={(e) => onSubmit(e)}>
                  <TextareaAutosize
                    placeholder="Enter your text here!"
                    value={updateText}
                    onChange={(e) => setUpdateText(e.target.value)}
                  />
                  <div>
                    <button type="submit" className="update">
                      Update
                    </button>
                    <button
                      className="cancel"
                      onClick={() => setUpdateText("")}>
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </form>
              )}

              <p
                onClick={() => setDisplayPost(true)}
                className="cursor-pointer">
                {body}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <div>
                  {/* <h5 className="translated">
                    {translate !== "" && translate}
                  </h5> */}
                  {/* 
                <h6 className='translate' onClick={() => translating(body)}>
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

                  <h6 className="translate">Translate</h6>
                </div>
              </div>

              <img
                alt="profile"
                src={image_set}
                className="cursor-pointer"
                onClick={() => setDisplayPost(true)}></img>
            </div>
          </div>
        ))}

      {displayPost && (
        <PostDisplay
          post={post}
          setDisplayPost={setDisplayPost}
          likes={likes}
          setLikes={setLikes}
          createPostReactions={createPostReactions}
          deletePostReactions={deletePostReactions}
          comments={comments}
          setComments={setComments}
          user={user}
          createPostComment={createPostComment}
          deletePostComment={deletePostComment}
          translation={translation}
          tags={tags}
        />
      )}

      {confirm && (
        <Confirm
          accept={() => deleting()}
          decline={() => setConfirm(false)}
          heading={"Do you want to delete this post?"}
        />
      )}

      {popQuran && (
        <Popup
          func={() => setPopQuran(null)}
          heading={popQuran.SaheehInternational}
          text={popQuran.Junagarhi}
          subText={popQuran.AyahTextQalam}
          subSubText={popQuran.AyahNumber + ", " + popQuran.SurahName}
        />
      )}

      {popHadees && (
        <Popup
          func={() => setPopHadees(null)}
          heading={popHadees.Arabic}
          text={popHadees.English}
          subText={popHadees.Urdu}
          subSubText={
            popHadees.HadithNumber +
            ", " +
            popHadees.BookName +
            ", " +
            popHadees.Sanad
          }
        />
      )}
    </Fragment>
  );
};

Post.propTypes = {
  deletePost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  createPostReactions: PropTypes.func.isRequired,
  getPostReaction: PropTypes.func.isRequired,
  deletePostReactions: PropTypes.func.isRequired,
  getPostComments: PropTypes.func.isRequired,
  createPostComment: PropTypes.func.isRequired,
  deletePostComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  translation: PropTypes.func.isRequired,
  tags: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deletePost,
  updatePost,
  createPostReactions,
  getPostReaction,
  deletePostReactions,
  getPostComments,
  createPostComment,
  deletePostComment,
  translation,
  tags,
})(Post);
