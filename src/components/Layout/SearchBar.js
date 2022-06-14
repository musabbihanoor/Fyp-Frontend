import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Search } from "@material-ui/icons";
import { getProfiles, getProfile } from "../../actions/profile";
import { getGroups } from "../../actions/group";
import Loading from "./Loading";

const SearchBar = ({ getProfiles, getProfile, getGroups }) => {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfiles().then((res) => setUsers(res));
    getGroups().then((res) => setGroups(res));

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
          {
            users.length > 0 &&
              users.map((x, i) => (
                <Link to={{ pathname: "/profile", state: { user: x.id } }}>
                  {(x.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    (x.country &&
                      x.country
                        .toLowerCase()
                        .includes(searchText.toLowerCase())) ||
                    (x.city &&
                      x.city
                        .toLowerCase()
                        .includes(searchText.toLowerCase())) ||
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
                        <img
                          alt="profile"
                          src={
                            x.profile_picture
                              ? x.profile_picture
                              : "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
                          }
                        />
                        <div className="detail">
                          <p>
                            {x.name}{" "}
                            <span style={{ color: "#F50057", fontSize: 11 }}>
                              user
                            </span>
                          </p>
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
            // <p style={{ textAlign: "center" }}>No results for "{searchText}"</p>
          }
          {groups.length > 0 &&
            groups.map((x, i) => (
              <Link to={{ pathname: "/group", state: { group: x } }}>
                {(x.name.toLowerCase().includes(searchText.toLowerCase()) ||
                  (x.username &&
                    x.username
                      .toLowerCase()
                      .includes(searchText.toLowerCase())) ||
                  (x.description &&
                    x.description
                      .toLowerCase()
                      .includes(searchText.toLowerCase()))) && (
                  <>
                    <button
                      onClick={() => {
                        setLoading(true);
                        getProfile(x.id).then((res) => setLoading(false));
                        setSearchText("");
                      }}>
                      <img
                        alt="profile"
                        src={
                          x.cover_picture
                            ? x.cover_picture
                            : "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
                        }
                      />
                      <div className="detail">
                        <p>
                          {x.name}{" "}
                          <span style={{ color: "#3F51B5", fontSize: 11 }}>
                            group
                          </span>
                        </p>
                        <h6 style={{ fontWeight: "700" }}>
                          {x.username && x.username}{" "}
                          <span style={{ fontWeight: "400" }}> . admin</span>{" "}
                        </h6>
                      </div>
                    </button>
                    <hr />{" "}
                  </>
                )}
              </Link>
            ))}
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
};

SearchBar.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { getProfiles, getProfile, getGroups })(
  SearchBar,
);
