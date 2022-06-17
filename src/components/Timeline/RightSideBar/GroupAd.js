import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

const GroupAd = ({ group: { groups } }) => {
  var num = Math.floor(Math.random() * groups.length);

  return (
    <Fragment>
      {groups[num] && (
        <div className="group-ad">
          <img
            alt="pic"
            src={
              groups[num].cover_picture
                ? groups[num].cover_picture
                : "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"
            }
          />
          <h3>{groups[num].name}</h3>
          <p>{groups[num].description}</p>
          <Button variant="outlined" color="primary">
            <Link to={{ pathname: "/group", state: { group: groups[num] } }}>
              Visit
            </Link>
          </Button>
        </div>
      )}
    </Fragment>
  );
};

GroupAd.propTypes = {
  group: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
});

export default connect(mapStateToProps, {})(GroupAd);
