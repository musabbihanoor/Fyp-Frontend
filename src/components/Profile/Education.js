import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import "./Profile.css";

const Education = ({
  close,
  educations,
  createEducation,
  deleteEducation,
  updateEducation,
  error,
}) => {
  const [formData, setFormData] = useState({
    education_type: "",
    education_level: "",
    organization: "",
    visibility: "",
    study_here: false,
  });

  const [update, setUpdate] = useState(null);

  const { education_type, education_level, organization, visibility } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (update === null) {
      createEducation(formData).then((res) => {
        res.status === 201 &&
          setFormData({
            education_type: "",
            education_level: "",
            organization: "",
            visibility: "",
            study_here: false,
          });
      });
    } else {
      updateEducation(update.id, formData).then((res) => {
        res.status === 201 &&
          setFormData({
            education_type: "",
            education_level: "",
            organization: "",
            visibility: "",
            study_here: false,
          });
        setUpdate(null);
      });
    }
  };

  useEffect(() => {
    update &&
      setFormData({
        ...formData,
        education_type: update.education_type,
        education_level: update.education_level,
        organization: update.organization,
        visibility: update.visibility,
        study_here: update.study_here,
      });
  }, [update]);

  return (
    <div className="absolute">
      <div className="absolute-content education">
        <button className="absolute-close" onClick={() => close(false)}>
          <i className="fas fa-times"></i>
        </button>
        <h1>Education</h1>

        {educations.map((x, i) => (
          <div className="item" key={i}>
            <p>
              Type: <span>{x.education_type}</span>
            </p>
            <p>
              Level: <span>{x.education_level}</span>
            </p>
            <p>
              Organization: <span>{x.organization}e</span>
            </p>
            <p>
              Visibility: <span style={{ color: "red" }}>{x.visibility}</span>
            </p>
            <p style={{ color: "green" }}>{x.study_here && "Study Here"}</p>
            <div className="options">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setUpdate(x)}>
                <Edit />
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteEducation(x.id)}>
                <Delete />
              </Button>
            </div>
          </div>
        ))}

        <form>
          <h5 style={{ marginBottom: 0 }}>Add education</h5>
          <TextField
            error={error.education_type}
            id={
              error.education_type
                ? "outlined-error-helper-text"
                : "outlined-basic"
            }
            helperText={error.education_type && error.education_type[0]}
            label="Type"
            variant="outlined"
            margin="normal"
            name="education_type"
            style={{ width: 300, marginRight: 10 }}
            value={education_type}
            onChange={(e) => onChange(e)}
          />
          <FormControl
            variant="outlined"
            margin="normal"
            style={{ width: 300, marginRight: 10 }}
            error={error.education_level}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Level
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id={
                error.education_level
                  ? "demo-simple-select-error"
                  : "demo-simple-select-autowidth"
              }
              label="Level"
              name="education_level"
              value={education_level}
              onChange={(e) => onChange(e)}>
              <MenuItem value={"Level 1"}>Level1</MenuItem>
              <MenuItem value={"Level 2"}>Level2</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
            <FormHelperText>
              {error.education_level && error.education_level[0]}
            </FormHelperText>
          </FormControl>
          <TextField
            error={error.organization}
            id={
              error.organization
                ? "outlined-error-helper-text"
                : "outlined-basic"
            }
            helperText={error.organization && error.organization[0]}
            label="Organization"
            variant="outlined"
            margin="normal"
            name="organization"
            style={{ width: 300, marginRight: 10 }}
            value={organization}
            onChange={(e) => onChange(e)}
          />
          <FormControl
            variant="outlined"
            margin="normal"
            style={{ width: 300, marginRight: 10 }}
            error={error.visibility}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Visibility
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id={
                error.visibility
                  ? "demo-simple-select-error"
                  : "demo-simple-select-autowidth"
              }
              label="Visibility"
              name="visibility"
              value={visibility}
              onChange={(e) => onChange(e)}>
              <MenuItem value={"Visible"}>Visible</MenuItem>
              <MenuItem value={"Hidden"}>Hidden</MenuItem>
            </Select>
            <FormHelperText>
              {error.visibility && error.visibility[0]}
            </FormHelperText>
          </FormControl>
          <div style={{ marginBottom: 10 }}>
            <input
              type="checkbox"
              onChange={(e) =>
                setFormData({ ...formData, study_here: e.target.checked })
              }
            />
            <label>Study here</label>
          </div>
        </form>
        <Button variant="contained" onClick={(e) => onSubmit(e)}>
          {update !== null ? "update" : "add"}
        </Button>
      </div>
    </div>
  );
};

export default Education;
