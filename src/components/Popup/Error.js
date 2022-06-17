import React from "react";
import { Warning } from "@material-ui/icons";

const Error = ({ func, text }) => {
  return (
    <div className="absolute">
      <div className="absolute-content popup error">
        <center>
          <Warning style={{ fontSize: 40, color: "#F35854" }} />
        </center>

        <h1 style={{ color: "gray", fontSize: 24 }}>Oh snap!</h1>
        <p style={{ color: "gray", fontSize: 20 }}>{text}</p>
        <div>
          <button onClick={func}>Dismiss</button>
        </div>
      </div>
    </div>
  );
};

export default Error;
