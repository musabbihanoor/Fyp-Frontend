import React, { useState } from "react";
import Ahadees from "./Ahadees";
import Verses from "./Verses";

const PostReference = ({
  setAddRef,
  setQuranRef,
  QuranReference,
  AhadeesReference,
  setAhadeesRef,
}) => {
  const [option, setOption] = useState("v");
  const [showOption, setShowOption] = useState(true);
  return (
    <div className="absolute post-ref">
      <div className="absolute-content" style={{ marginTop: 100 }}>
        <button className="absolute-close" onClick={() => setAddRef(false)}>
          <i className="fas fa-times"></i>
        </button>
        <div className="refs">
          {showOption && (
            <div className="ref-nav">
              <button
                onClick={() => setOption("v")}
                className={`${option === "v" && "selected"}`}>
                Verses
              </button>
              <button
                onClick={() => setOption("a")}
                className={`${option === "a" && "selected"}`}>
                Ahadees
              </button>
            </div>
          )}

          {option === "v" && (
            <Verses
              setShowOption={setShowOption}
              reference={QuranReference}
              setRef={setQuranRef}
            />
          )}
          {option === "a" && (
            <Ahadees
              setShowOption={setShowOption}
              reference={AhadeesReference}
              setRef={setAhadeesRef}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostReference;
