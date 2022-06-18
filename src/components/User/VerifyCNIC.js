import React, { useEffect, Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { AddAPhotoTwoTone, Delete } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { verifyId } from "../../actions/auth";
import Error from "../Popup/Error";
import Loading from "../Layout/Loading";

import "./User.css";

const VerifyCNIC = ({
  auth: { isAuthenticated, loading, id_verified, user },
  history,
  profile,
  verifyId,
}) => {
  const [name, setName] = useState(user.name);
  const [id, setId] = useState("");
  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const [showFront, setShowFront] = useState(null);
  const [showBack, setShowBack] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      history.push("/");
    }
    if (isAuthenticated && !loading && id_verified) {
      history.push("/timeline");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loading, id_verified]);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoad(true);
    var formData = new FormData();
    formData.append("name", name);
    formData.append("cnic", id);
    formData.append("password", password);
    formData.append("front", front);
    formData.append("back", back);
    verifyId(formData).then((res) => {
      if (res.status === 400) {
        setLoad(false);
        setError(res.data.response);
      }
      if (res.status === 500 || res.status === 503) {
        setLoad(false);
        setError("Server error");
      }
      if (res.status === 200 || res.status === 201) {
        setLoad(false);
        history.push("/timeline");
      }
    });
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
              readOnly
            />

            <p>Password</p>
            <input
              className="verify cnic"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

      {load && <Loading />}
      {error !== "" && (
        <Error
          func={() => setError("")}
          text={error}
          instructions={[
            "Please check the following rules before submitting",
            "1. Your profile name should not be same as your CNIC name",
            "2. Either your uploaded document is not a correct CNIC or the picture is very dark.",
            "3. Your profile should not be updated in the last seven days.",
            "4. Your CNIC should be matching with the one you entered.",
            "5. Kindly check if your have uploaded front and back of CNIC in the correct places.",
          ]}
        />
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
