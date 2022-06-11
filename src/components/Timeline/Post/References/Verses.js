import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../../Layout/Loading";
import { covertToArabic } from "../../../../actions/covert";
import { Switch } from "@material-ui/core";

const Verses = ({ setShowOption, reference, setRef }) => {
  const [loading, setLoading] = useState(true);
  const [surahs, setSurahs] = useState([]);
  const [parahs, setParahs] = useState([]);
  const [showSurah, setShowSurah] = useState(true);
  const [selectedSurah, setSelectedSurah] = useState("");
  const [selectedParah, setSelectedParah] = useState("");
  const [verses, setVerses] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchSurahs = async () => {
    setLoading(true);
    try {
      axios
        .get("https://apihadeesquran.herokuapp.com/quran/getAllSurah/")
        .then((res) => {
          setSurahs(res.data);
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const fetchParahs = async () => {
    setLoading(true);
    try {
      axios
        .get("https://apihadeesquran.herokuapp.com/quran/getAllParah/")
        .then((res) => {
          setLoading(false);
          setParahs(res.data);
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const fetchVerses = async (id, method) => {
    setLoading(true);

    try {
      axios
        .get(`https://apihadeesquran.herokuapp.com/quran/${method}/${id}`)
        .then((res) => {
          setLoading(false);
          setVerses(res.data);
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const convert = () => {
    setSearchText(covertToArabic(searchText));
  };

  useEffect(() => {
    fetchParahs();
    fetchSurahs();

    selectedSurah !== "" && fetchVerses(selectedSurah, "bySurah");
    selectedParah !== "" && fetchVerses(selectedParah, "byParah");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedParah, selectedSurah]);

  return (
    <div className="ref-verses">
      {selectedParah === "" && selectedSurah === "" && (
        <>
          <form>
            <select
              onChange={(e) =>
                setShowSurah(e.target.value === "s" ? true : false)
              }>
              <option value={"s"}>Surah</option>
              <option value={"p"}>Parah</option>
            </select>
            <input
              type="text"
              onKeyPress={() => convert(searchText)}
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              dir="rtl"
              id="text1"
            />
            <button onClick={(e) => e.preventDefault()}>
              <i className="fas fa-search"></i>
            </button>
          </form>

          {showSurah ? (
            <Surah
              surahs={surahs}
              setSelectedSurah={setSelectedSurah}
              setShowOption={setShowOption}
              searchText={searchText}
            />
          ) : (
            <Parah
              parahs={parahs}
              setSelectedParah={setSelectedParah}
              setShowOption={setShowOption}
            />
          )}
        </>
      )}

      {(selectedParah !== "" || selectedSurah !== "") && (
        <Verse
          verses={verses}
          setSelectedSurah={setSelectedSurah}
          setSelectedParah={setSelectedParah}
          setShowOption={setShowOption}
          reference={reference}
          setRef={setRef}
        />
      )}
      {loading && <Loading />}
    </div>
  );
};

export default Verses;

const Surah = ({ surahs, setSelectedSurah, setShowOption, searchText }) => {
  return (
    <>
      {surahs.map((x, i) => (
        <Fragment key={i}>
          {x.SurahName.includes(searchText.slice(0, -1)) && (
            <>
              <div className="ref-item">
                <p>{x.SurahNumber + ". " + x.SurahName}</p>
                <button
                  onClick={() => {
                    setSelectedSurah(x.SurahNumber);
                    setShowOption(false);
                  }}>
                  <i className="fas fa-plus"></i> Select
                </button>
              </div>
              <hr />
            </>
          )}
        </Fragment>
      ))}
    </>
  );
};

const Parah = ({ parahs, setSelectedParah, setShowOption }) => {
  return (
    <>
      {parahs.map((x, i) => (
        <Fragment key={i}>
          <div className="ref-item">
            <p>{x.ParahNumber + ". " + x.Parah}</p>
            <button
              onClick={() => {
                setSelectedParah(x.ParahNumber);
                setShowOption(false);
              }}>
              <i className="fas fa-plus"></i> Select
            </button>
          </div>
          <hr />
        </Fragment>
      ))}
    </>
  );
};

const Verse = ({
  verses,
  setSelectedParah,
  setSelectedSurah,
  setShowOption,
  setRef,
  reference,
}) => {
  const [searchEng, setSearchEng] = useState("");
  const [switchLang, setSwitchLang] = useState(false);

  const convert = () => {
    setSearchEng(covertToArabic(searchEng));
  };

  const referencing = (data) => {
    if (reference.find((x) => x.Id === data.Id)) {
      setRef(reference.filter((x) => x.Id !== data.Id));
    } else {
      setRef([...reference, data]);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setSelectedParah("");
          setSelectedSurah("");
          setShowOption(true);
        }}
        style={{
          backgroundColor: "transparent",
          border: "none",
          fontSize: 16,
          marginTop: 10,
        }}>
        <i className="fas fa-arrow-left"></i> Back
      </button>
      <form>
        <input
          type="text"
          onChange={(e) => setSearchEng(e.target.value)}
          value={searchEng}
          dir={switchLang && "rtl"}
          onKeyPress={() => switchLang && convert()}
        />
        <button onClick={(e) => e.preventDefault()}>
          <i className="fas fa-search"></i>
        </button>
        <Switch onChange={(e) => setSwitchLang(e.target.checked)} />
        <label style={{ color: switchLang ? "#F50057" : "#9F9F9F" }}>
          Arabic
        </label>
      </form>
      {verses.map((x, i) => (
        <Item
          x={x}
          key={i}
          reference={reference}
          searchEng={searchEng}
          referencing={referencing}
        />
      ))}
    </>
  );
};

const Item = ({ x, reference, searchEng, referencing }) => {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    reference.find((i) => i.Id === x.Id) && setAdded(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {/* {console.log(x)} */}
      {(x.SaheehInternational.toLowerCase().includes(searchEng.toLowerCase()) ||
        x.AyahNumber.toString()
          .toLowerCase()
          .includes(searchEng.toLowerCase())) && (
        <>
          <div className="ref-item">
            <p>{x.AyahNumber + ". " + x.SaheehInternational}</p>
            <p style={{ textAlign: "end" }}>{x.Junagarhi}</p>
            <p style={{ textAlign: "end" }}>{x.AyahTextQalam}</p>
            <h4>
              {x.AyahNumber}, {x.SurahName}
            </h4>
            <button
              style={{ color: added && "red" }}
              onClick={() => {
                referencing(x);
                setAdded(!added);
              }}>
              <i className={`fas fa-${added ? "times" : "plus"}`}></i>{" "}
              {added ? "Remove" : "Add as a Reference"}
            </button>
          </div>
          <hr />
        </>
      )}
    </Fragment>
  );
};
