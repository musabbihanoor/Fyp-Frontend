import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Loading from "../../../Layout/Loading";
import { Switch } from "@material-ui/core";
import { covertToArabic } from "../../../../actions/covert";

const Ahadees = ({ reference, setRef, setShowOption }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchText2, setSearchText2] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [verses, setVerses] = useState([]);
  const [switchLang, setSwitchLang] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      axios
        .get("https://apihadeesquran.herokuapp.com/hadees/getAllBooks/")
        .then((res) => {
          setBooks(res.data);
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const fetchChapters = async () => {
    setLoading(true);
    try {
      axios
        .get(
          `https://apihadeesquran.herokuapp.com/hadees/getChapters/${selectedBook}/`,
        )
        .then((res) => {
          setChapters(res.data);
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const fetchVerses = async () => {
    setLoading(true);
    try {
      axios
        .get(
          `https://apihadeesquran.herokuapp.com/hadees/byChapters/${selectedBook}/${selectedChapter}/`,
        )
        .then((res) => {
          setVerses(res.data);
          setLoading(false);
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
    fetchBooks();
    selectedBook !== "" && fetchChapters();
    selectedBook !== "" && selectedChapter !== "" && fetchVerses();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBook, selectedChapter]);

  return (
    <div className="ref-ahadees">
      {chapters.length === 0 &&
        books.map((x, i) => (
          <>
            {/* {console.log(x)} */}
            <div className="ref-item" key={i}>
              <p>{x.displayname}</p>
              <button
                onClick={() => {
                  setSelectedBook(x.id);
                  setShowOption(false);
                }}>
                <i className="fas fa-plus"></i> Open Book
              </button>
            </div>
            <hr />
          </>
        ))}

      {chapters.length > 0 && verses.length === 0 && (
        <>
          <button
            onClick={() => {
              setChapters([]);
              setSelectedBook("");
              setShowOption(true);
            }}
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: 16,
            }}>
            <i className="fas fa-arrow-left"></i> Back
          </button>
          <form>
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
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
        </>
      )}

      {chapters.length > 0 &&
        verses.length === 0 &&
        chapters.map((x, i) => (
          <>
            {(x.Topic.includes(searchText.slice(0, -1)) ||
              x.ChapterId.toString().includes(searchText)) && (
              <>
                <div className="ref-item" key={i}>
                  <p>
                    {i + 1}. {x.Topic}
                  </p>
                  <h6>
                    {x.bookid}, {x.ChapterId}
                  </h6>
                  <button onClick={() => setSelectedChapter(x.ChapterId)}>
                    <i className="fas fa-plus"></i> View Chapter
                  </button>
                </div>
                <hr />
              </>
            )}
          </>
        ))}

      {verses.length > 0 && (
        <>
          <button
            onClick={() => {
              setVerses([]);
              setSelectedChapter("");
            }}
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: 16,
            }}>
            <i className="fas fa-arrow-left"></i> Back
          </button>
          <form>
            <input
              type="text"
              onChange={(e) => setSearchText2(e.target.value)}
              value={searchText2}
            />
            <button onClick={(e) => e.preventDefault()}>
              <i className="fas fa-search"></i>
            </button>
          </form>
        </>
      )}

      {verses.length > 0 &&
        verses.map((x, i) => (
          <Hadees
            x={x}
            key={i}
            reference={reference}
            setRef={setRef}
            searchText2={searchText2}
          />
        ))}

      {loading && <Loading />}
    </div>
  );
};

export default Ahadees;

const Hadees = ({ x, reference, setRef, searchText2 }) => {
  const [added, setAdded] = useState(false);

  const referencing = (data) => {
    if (reference.find((x) => x.ID === data.ID)) {
      setRef(reference.filter((x) => x.ID !== data.ID));
    } else {
      setRef([...reference, data]);
    }
  };

  useEffect(() => {
    reference.find((i) => i.ID === x.ID) && setAdded(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {x.English.toLowerCase().includes(searchText2.toLowerCase()) && (
        <>
          <div className="ref-item">
            <p>{x.English}</p>
            <p>{x.Arabic}</p>
            <h6>
              {x.HadithNumber}, {x.BookName}, {x.Sanad}
            </h6>
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
