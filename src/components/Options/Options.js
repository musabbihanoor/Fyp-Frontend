import React, { useEffect } from "react";
import "../../App.css";

const Options = () => {
  var background = process.env.PUBLIC_URL + "/background.png";

  useEffect(() => {
    document.body.style.backgroundImage = `url(${background})`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  });
  return <div className='options'></div>;
};

export default Options;
