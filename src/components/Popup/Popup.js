import React from "react";

const Popup = ({ func, heading, text, subText, subSubText }) => {
  return (
    <div className="absolute">
      <div className="absolute-content popup">
        <h1>{heading}</h1>
        <p>{text}</p>
        {subText && <p>{subText}</p>}
        {subSubText && <h4 style={{ textAlign: "center" }}>{subSubText}</h4>}
        <div>
          <button onClick={func}>Okay</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
