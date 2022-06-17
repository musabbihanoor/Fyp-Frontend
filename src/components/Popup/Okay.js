import React from "react";
import { CheckCircle } from "@material-ui/icons";

const Okay = ({ func, text }) => {
  return (
    <div className="absolute">
      <div className="absolute-content popup okay">
        <center>
          <CheckCircle style={{ fontSize: 50, color: "#5dd581" }} />
        </center>

        <h1 style={{ color: "gray", fontSize: 24 }}>Yay!</h1>
        <p style={{ color: "gray", fontSize: 20 }}>{text}</p>
        <div>
          <button onClick={func}>Dismiss</button>
        </div>
      </div>
    </div>
  );
};

export default Okay;
