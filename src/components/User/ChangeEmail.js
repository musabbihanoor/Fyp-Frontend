import React from "react";
import { TextField, Button } from "@material-ui/core";

const ChangeEmail = ({
  setChange,
  newEmail,
  setNewEmail,
  error,
  updateProfile,
  id,
  setUpdatedEmail,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile({ email: newEmail }, id).then((res) => {
      if (res.status === 200) {
        setChange(false);
        setUpdatedEmail(res.data.email);
      }
    });
  };
  return (
    <div className="absolute ">
      <div className="absolute-content changeEmail">
        <button className="absolute-close" onClick={() => setChange(false)}>
          <i className="fas fa-times"></i>
        </button>
        <form>
          <h3>Enter new email</h3>
          <TextField
            variant="outlined"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            error={error.email}
            helperText={error.email && error.email}
            placeholder="New email"
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => onSubmit(e)}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangeEmail;
