import React, { useEffect, Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { AddAPhotoTwoTone, Delete } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { verifyId } from "../../actions/auth";

import "./User.css";

const VerifyCNIC = ({
  auth: { isAuthenticated, loading, id_verified, user },
  history,
  profile: { error },
  verifyId,
}) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const [showFront, setShowFront] = useState(null);
  const [showBack, setShowBack] = useState(null);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      history.push("/");
    }
    // if (isAuthenticated && !loading && id_verified) {
    //   history.push("/timeline");
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loading, id_verified]);

  const onSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("name", name);
    formData.append("cnic", id);
    formData.append("front", front);
    formData.append("back", back);
    verifyId(formData).then((res) => console.log(res));
  };

  return (
    <Fragment>
      {user && (
        <div className="verify">
          <h1>Please enter your CNIC info</h1>
          {/* <p>{updatedEmail === "" ? user.email : updatedEmail}</p> */}
          <form>
            <p>Full Name</p>
            <input
              className="verify cnic"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <p>ID</p>
            <input
              className="verify cnic"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="xxxxx-xxxxxxxx-x"
            />

            <p>Enter Front and Back picture of your CNIC</p>

            <div className="img">
              <label style={{ padding: showFront && 0 }}>
                {showFront ? (
                  <>
                    <img alt="cnic" src={showFront} />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowFront(null);
                        setFront(null);
                      }}>
                      <Delete />
                    </button>
                  </>
                ) : (
                  <>
                    <AddAPhotoTwoTone
                      style={{ fontSize: 100, color: "#ccc" }}
                    />
                    <p
                      style={{
                        fontSize: 16,
                        color: "#ccc",
                        textAlign: "center",
                        margin: 0,
                      }}>
                      Front
                    </p>

                    <input
                      type="file"
                      onChange={(e) => {
                        setFront(e.target.files[0]);
                        var binaryData = [];
                        binaryData.push(e.target.files[0]);
                        setShowFront(
                          window.URL.createObjectURL(
                            new Blob(binaryData, { type: "application/zip" }),
                          ),
                        );
                      }}
                    />
                  </>
                )}
              </label>

              <label style={{ padding: showBack && 0 }}>
                {showBack ? (
                  <>
                    <img alt="cnic" src={showBack} />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowBack(null);
                        setBack(null);
                      }}>
                      <Delete />
                    </button>
                  </>
                ) : (
                  <>
                    <AddAPhotoTwoTone
                      style={{ fontSize: 100, color: "#ccc" }}
                    />{" "}
                    <p
                      style={{
                        fontSize: 16,
                        color: "#ccc",
                        textAlign: "center",
                        margin: 0,
                      }}>
                      Back
                    </p>
                    <input
                      type="file"
                      onChange={(e) => {
                        setBack(e.target.files[0]);
                        var binaryData = [];
                        binaryData.push(e.target.files[0]);
                        setShowBack(
                          window.URL.createObjectURL(
                            new Blob(binaryData, { type: "application/zip" }),
                          ),
                        );
                      }}
                    />
                  </>
                )}
              </label>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => onSubmit(e)}>
              Submit
            </Button>
          </form>
        </div>
      )}
    </Fragment>
  );
};

VerifyCNIC.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  verifyId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  verifyId,
})(withRouter(VerifyCNIC));
