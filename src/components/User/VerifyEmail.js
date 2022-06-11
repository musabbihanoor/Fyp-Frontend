import React, { useEffect, Fragment, useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ChangeEmail from "./ChangeEmail";
import { updateProfile } from "../../actions/profile";
import { verifyEmail, confirmEmail } from "../../actions/auth";
import "./User.css";
import { Button } from "@material-ui/core";
// import ReactInputVerificationCode from "react-input-verification-code";

const VerifyEmail = ({
  auth: { isAuthenticated, loading, verified, user },
  history,
  updateProfile,
  profile: { error },
  verifyEmail,
  confirmEmail,
}) => {
  const [change, setChange] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [code, setCode] = useState(null);
  const [sent, setSent] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState("");

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      history.push("/");
    }
    if (isAuthenticated && !loading && verified) {
      history.push("/timeline");
    }
  }, [isAuthenticated, loading, verified]);

  const onSubmit = (e) => {
    e.preventDefault();
    confirmEmail({ code: code }).then((res) => console.log(res));
  };

  return (
    <Fragment>
      {user && (
        <div className="verify">
          <h1>Please verify your email</h1>
          <p>{updatedEmail === "" ? user.email : updatedEmail}</p>
          {!sent && <h2>Click here to verify your email</h2>}
          {sent && (
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ textAlign: "center" }}>
                Enter the code we have sent on your email
              </h4>
              {/* <ReactInputVerificationCode
                value={value}
                placeholder={null}
                length={6}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
              /> */}
              <input value={code} onChange={(e) => setCode(e.target.value)} />
            </div>
          )}
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setSent(true);
                verifyEmail();
              }}>
              {sent ? "send again" : "send"}
            </Button>
            {!sent && (
              <Button
                color="primary"
                variant="outlined"
                onClick={() => setChange(true)}>
                Change email
              </Button>
            )}

            {sent && (
              <Button
                color="primary"
                variant="outlined"
                onClick={(e) => onSubmit(e)}>
                Upload
              </Button>
            )}
          </div>
          {change && (
            <ChangeEmail
              setChange={setChange}
              newEmail={newEmail}
              setNewEmail={setNewEmail}
              error={error}
              updateProfile={updateProfile}
              id={user.id}
              setUpdatedEmail={setUpdatedEmail}
            />
          )}
        </div>
      )}
    </Fragment>
  );
};

VerifyEmail.propTypes = {
  auth: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  verifyEmail: PropTypes.func.isRequired,
  confirmEmail: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  updateProfile,
  verifyEmail,
  confirmEmail,
})(withRouter(VerifyEmail));
