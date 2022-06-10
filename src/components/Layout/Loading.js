import React from "react";

const Loading = () => {
  return (
    <div className="absolute">
      <img
        style={{ width: 100, position: "absolute", top: "50%", left: "50%" }}
        alt="loading"
        src="https://icon-library.com/images/loading-icon-transparent-background/loading-icon-transparent-background-12.jpg"
      />
    </div>
  );
};

export default Loading;
