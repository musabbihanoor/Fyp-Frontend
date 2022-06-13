import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Search } from "@material-ui/icons";
import { getProfiles, getProfile } from "../../actions/profile";
import Loading from "./Loading";

const SearchBar = ({ getProfiles, getProfile }) => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfiles().then((res) => setData(res));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="searchbar">
      <form>
        <input
          value={searchText}
          onChange={(e) => {
            e.preventDefault();
            setSearchText(e.target.value);
          }}
        />
        <i>
          <Search />
        </i>
      </form>
      {searchText !== "" && (
        <div className="searched">
          {data.length > 0 ? (
            data.map((x, i) => (
              <Link to={{ pathname: "/profile", state: { user: x.id } }}>
                {(x.name.toLowerCase().includes(searchText.toLowerCase()) ||
                  (x.country &&
                    x.country
                      .toLowerCase()
                      .includes(searchText.toLowerCase())) ||
                  (x.city &&
                    x.city.toLowerCase().includes(searchText.toLowerCase())) ||
                  (x.home_town &&
                    x.home_town
                      .toLowerCase()
                      .includes(searchText.toLowerCase())) ||
                  (x.gender &&
                    x.gender
                      .toLowerCase()
                      .startsWith(searchText.toLowerCase()))) && (
                  <>
                    <button
                      onClick={() => {
                        setLoading(true);
                        getProfile(x.id).then((res) => setLoading(false));
                        setSearchText("");
                      }}>
                      <img alt="profile" src={x.profile_picture} />
                      <div className="detail">
                        <p>{x.name}</p>
                        <h6>
                          {x.home_town && x.home_town + ", "}{" "}
                          {x.city && x.city + ", "}
                          {x.country && x.country}
                        </h6>
                      </div>
                    </button>
                    <hr />{" "}
                  </>
                )}
              </Link>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No results for "{searchText}"</p>
          )}
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
};

SearchBar.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { getProfiles, getProfile })(SearchBar);
