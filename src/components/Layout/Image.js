import React from "react";

const Image = ({ setShowImage, src }) => {
  return (
    <div className='absolute'>
      <div
        className='absolute-content'
        style={{
          marginTop: 200,
          width: 700,
          height: 700,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button className='absolute-close' onClick={() => setShowImage(false)}>
          <i className='fas fa-times'></i>
        </button>
        <img
          src={src}
          alt='img'
          style={{ height: "99%", objectFit: "cover", margin: "0 auto" }}
        />
      </div>
    </div>
  );
};

export default Image;
