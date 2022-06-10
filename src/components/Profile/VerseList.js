import React from "react";

const VerseList = ({ setShowVerse }) => {
  return (
    <div className="absolute ">
      <div className="absolute-content verse-list">
        <button className="absolute-close" onClick={() => setShowVerse(false)}>
          <i className="fas fa-times"></i>
        </button>

        <h1>Verses</h1>

        <form>
          <input />
          <button>Search</button>
        </form>

        <button className="item">
          <p>
            Surely this Quran guides to that which is most upright and gives
            good news to the believers who do good that they shall have a great
            reward. And that (as for) those who do not believe in the Hereafter,
            We have prepared for them a painful chastisement.
          </p>
          <h6>- The Holy Quran, Sura 17-9/10</h6>
        </button>
        <button className="item">
          <p>
            Surely this Quran guides to that which is most upright and gives
            good news to the believers who do good that they shall have a great
            reward. And that (as for) those who do not believe in the Hereafter,
            We have prepared for them a painful chastisement.
          </p>
          <h6>- The Holy Quran, Sura 17-9/10</h6>
        </button>
        <button className="item">
          <p>
            Surely this Quran guides to that which is most upright and gives
            good news to the believers who do good that they shall have a great
            reward. And that (as for) those who do not believe in the Hereafter,
            We have prepared for them a painful chastisement.
          </p>
          <h6>- The Holy Quran, Sura 17-9/10</h6>
        </button>
        <button className="item">
          <p>
            Surely this Quran guides to that which is most upright and gives
            good news to the believers who do good that they shall have a great
            reward. And that (as for) those who do not believe in the Hereafter,
            We have prepared for them a painful chastisement.
          </p>
          <h6>- The Holy Quran, Sura 17-9/10</h6>
        </button>

        <button className="item">
          <p>
            Surely this Quran guides to that which is most upright and gives
            good news to the believers who do good that they shall have a great
            reward. And that (as for) those who do not believe in the Hereafter,
            We have prepared for them a painful chastisement.
          </p>
          <h6>- The Holy Quran, Sura 17-9/10</h6>
        </button>
        <button className="item">
          <p>
            Surely this Quran guides to that which is most upright and gives
            good news to the believers who do good that they shall have a great
            reward. And that (as for) those who do not believe in the Hereafter,
            We have prepared for them a painful chastisement.
          </p>
          <h6>- The Holy Quran, Sura 17-9/10</h6>
        </button>
      </div>
    </div>
  );
};

export default VerseList;
