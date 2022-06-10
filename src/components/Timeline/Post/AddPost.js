import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createPost } from "../../../actions/post";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import PostReference from "./References/PostReference";
import Loading from "../../Layout/Loading";
import Popup from "../../Popup/Popup";
import {
  FileCopyTwoTone,
  SendTwoTone,
  AddPhotoAlternateTwoTone,
} from "@material-ui/icons";

import {
  hatespeech,
  islamophobia,
  similarity,
} from "../../../actions/AiModels";

const AddPost = ({ createPost, user, setData, data }) => {
  const [body, setBody] = useState("");
  const [image_set, setImage] = useState(null);
  const [showImage, setShowImage] = useState("");
  const [addRef, setAddRef] = useState(false);
  const [errText, setErrText] = useState(false);
  // const [errImg, setErrImg] = useState(false);
  const [pop, setPop] = useState(false);
  const [load, setLoad] = useState(false);
  const [QuranReference, setQuranRef] = useState([]);
  const [AhadeesReference, setAhadeesRef] = useState([]);

  // console.log( JSON.parse("[1, 2,3, 4]"));
  // console.log(JSON.stringify([1, 2, 3, 4]));

  const onSubmit = (e) => {
    e.preventDefault();
    if (body === "") {
      setErrText(true);
      return;
    } else {
      setErrText(false);
    }

    var quranic_ref = [];
    var hadees_ref = [];

    QuranReference.map((x) => quranic_ref.push(x.Id));
    AhadeesReference.map((x) => hadees_ref.push(x.HadithNumber + "a" + x.ID));

    const formData = new FormData();
    formData.append("body", body);
    image_set !== null && formData.append("image_set", image_set);
    quranic_ref.length > 0 && formData.append("quranic_ref", quranic_ref);
    hadees_ref.length > 0 && formData.append("hadees_ref", hadees_ref);

    setLoad(true);

    createPost(formData).then((res) => {
      setPop(true);
      setData([res, ...data]);
      setLoad(false);
      setAhadeesRef([]);
      setQuranRef([]);
    });
    // });
  };

  return (
    <div>
      <div className="add-post">
        <Link to={{ pathname: "/profile", state: { user: user } }}>
          <div className="user-info">
            <img
              src={
                user && user.profile_picture
                  ? user.profile_picture
                  : "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
              }></img>
            <h1>{user && user.name}</h1>
          </div>
        </Link>
        <form>
          <TextareaAutosize
            placeholder="What's on your mind"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            autoComplete="off"
            className={errText && "error"}
          />
          {errText && <p className="error">Enter a text</p>}
          {/* {errImg && <p className="error">Add an Image</p>} */}

          <div className="references">
            {QuranReference.length > 0 &&
              QuranReference.map((x) => (
                <p>
                  {x.AyahNumber}, {x.SurahName}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setQuranRef(QuranReference.filter((i) => i.Id !== x.Id));
                    }}>
                    <i className="fas fa-times"></i>
                  </button>
                </p>
              ))}
          </div>

          <div className="references">
            {AhadeesReference.length > 0 &&
              AhadeesReference.map((x) => (
                <p style={{ fontSize: 12, marginTop: 0 }}>
                  {x.HadithNumber}, {x.BookName}, {x.Sanad}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setAhadeesRef(
                        AhadeesReference.filter((i) => i.ID !== x.ID),
                      );
                    }}>
                    <i className="fas fa-times"></i>
                  </button>
                </p>
              ))}
          </div>

          <div className="options">
            <button
              className="ref"
              onClick={(e) => {
                e.preventDefault();
                setAddRef(true);
              }}>
              <FileCopyTwoTone style={{ color: "#EAB026" }} /> Reference
            </button>
            <label className="">
              <AddPhotoAlternateTwoTone style={{ color: "#E73F5A" }} /> Media
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setShowImage(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </label>

            <button
              type="submit"
              onClick={(e) => {
                onSubmit(e);
                setShowImage("");
                setImage(null);
                setBody("");
              }}>
              Send <SendTwoTone style={{ color: "#41B35D" }} />
            </button>
          </div>
        </form>{" "}
        {showImage && (
          <div className="show-image">
            <img src={showImage}></img>
            <button
              onClick={() => {
                setShowImage("");
                setImage(null);
              }}>
              <i className="fas fa-times hover-red"></i>
            </button>
          </div>
        )}
      </div>
      {addRef && (
        <PostReference
          setAddRef={setAddRef}
          QuranReference={QuranReference}
          setQuranRef={setQuranRef}
          AhadeesReference={AhadeesReference}
          setAhadeesRef={setAhadeesRef}
        />
      )}
      {pop && <Popup func={() => setPop(false)} heading={"Post Created!"} />}
      {load && <Loading />}
    </div>
  );
};

AddPost.propTypes = {
  createPost: PropTypes.func.isRequired,
  hatespeech: PropTypes.func.isRequired,
  islamophobia: PropTypes.func.isRequired,
  similarity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  createPost,
  hatespeech,
  islamophobia,
  similarity,
})(AddPost);
