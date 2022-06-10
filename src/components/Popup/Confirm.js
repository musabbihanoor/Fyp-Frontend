import React from "react";

const Confirm = ({ heading, text, accept, decline }) => {
  return (
    <div className="absolute">
      <div className="absolute-content popup">
        <h1>{heading}</h1>
        <p>{text}</p>
        <div>
          <button onClick={accept}>Accept</button>
          <button onClick={decline}>Decline</button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
