import React, { useState, useEffect } from "react";
import "./Profile.css";

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

const Experience = ({
  close,
  experiences,
  createExperience,
  updateExperience,
  deleteExperience,
  error,
}) => {
  const [update, setUpdate] = useState(null);

  const [formData, setFormData] = useState({
    organization: "",
    job_title: "",
    location: "",
    work_here: false,
    visibility: "visible",
    start: null,
    end: null,
  });

  const { organization, job_title, location, visibility, start, end } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (update === null) {
      createExperience(formData).then((res) => {
        res.status === 201 &&
          setFormData({
            organization: "",
            job_title: "",
            location: "",
            work_here: false,
            visibility: "visible",
            start: null,
            end: null,
          });
      });
    } else {
      updateExperience(update.id, formData).then((res) => {
        res.status === 201 &&
          setFormData({
            organization: "",
            job_title: "",
            location: "",
            work_here: false,
            visibility: "visible",
            start: null,
            end: null,
          });
        setUpdate(null);
      });
    }
  };

  useEffect(() => {
    update &&
      setFormData({
        ...formData,
        organization: update.organization,
        job_title: update.job_title,
        location: update.location,
        visibility: update.visibility,
        work_here: update.work_here,
        start: update.start,
        end: update.end,
      });
  }, [update]);

  return (
    <div className="absolute">
      <div className="absolute-content education">
        <button className="absolute-close" onClick={() => close(false)}>
          <i className="fas fa-times"></i>
        </button>
        <h1>Experience</h1>
        {experiences.map((x, i) => (
          <div className="item" key={i}>
            <p>
              Organization: <span>{x.organization}</span>
            </p>
            <p>
              Job Title: <span>{x.job_title}</span>
            </p>
            <p>
              Location: <span>{x.location}</span>
            </p>
            <p>
              Starting date: <span>{x.start}</span>
            </p>
            <p>
              Ending date: <span>{x.work_here ? "Work here" : x.end}</span>
            </p>
            <p>
              Visibility: <span style={{ color: "red" }}>{x.visibility}</span>
            </p>

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
                onClick={() => deleteExperience(x.id)}>
                <Delete />
              </Button>
            </div>
          </div>
        ))}

        <form>
          <h5 style={{ marginBottom: 0 }}>Add experience</h5>
          <TextField
            error={error.organization}
            id={
              error.organization
                ? "outlined-error-helper-text"
                : "outlined-basic"
            }
            helperText={error.organization && error.organization[0]}
            label="Organization Name"
            variant="outlined"
            margin="normal"
            name="organization"
            style={{ width: 300, marginRight: 10 }}
            value={organization}
            onChange={(e) => onChange(e)}
          />
          <TextField
            error={error.job_title}
            id={
              error.job_title ? "outlined-error-helper-text" : "outlined-basic"
            }
            helperText={error.job_title && error.job_title[0]}
            label="Job Title"
            variant="outlined"
            margin="normal"
            name="job_title"
            style={{ width: 300, marginRight: 10 }}
            value={job_title}
            onChange={(e) => onChange(e)}
          />

          <TextField
            error={error.location}
            id={
              error.location ? "outlined-error-helper-text" : "outlined-basic"
            }
            helperText={error.location && error.location[0]}
            label="Location"
            variant="outlined"
            margin="normal"
            name="location"
            style={{ width: 300, marginRight: 10 }}
            value={location}
            onChange={(e) => onChange(e)}
          />
          <FormControl
            variant="outlined"
            margin="normal"
            style={{ width: 300, marginRight: 10 }}
            error={error.location}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Visibility
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id={
                error.location
                  ? "demo-simple-select-error"
                  : "demo-simple-select-autowidth"
              }
              label="Visibility"
              name="visibility"
              value={visibility}
              onChange={(e) => onChange(e)}>
              <MenuItem value={"visible"}>Visible</MenuItem>
              <MenuItem value={"hidden"}>Hidden</MenuItem>
            </Select>
            <FormHelperText>
              {error.location && error.location[0]}
            </FormHelperText>
          </FormControl>

          <div style={{ display: "flex", marginTop: 20 }}>
            <div className="date-input">
              <label>Starting Date</label>
              <input
                name="start"
                value={start}
                type="date"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="date-input">
              <label>Ending Date</label>
              <input
                name="end"
                value={end}
                type="date"
                onChange={(e) => onChange(e)}
              />
              <span style={{ display: "flex" }}>
                <input
                  type="checkbox"
                  id="work"
                  onChange={(e) =>
                    setFormData({ ...formData, work_here: e.target.checked })
                  }
                />
                <label style={{ position: "static" }} htmlFor="work">
                  work here
                </label>
              </span>
            </div>
          </div>
        </form>
        <Button variant="contained" onClick={(e) => onSubmit(e)}>
          {update !== null ? "update" : "add"}
        </Button>
      </div>
    </div>
  );
};

export default Experience;
