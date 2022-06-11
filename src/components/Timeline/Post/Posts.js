import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Post from "./Post";
import { getPosts } from "../../../actions/post";
import "../Timeline.css";
import Loading from "../../Layout/Loading";

const Posts = ({
  getPosts,
  post: { posts, loading },
  userid,
  data,
  setData,
}) => {
  const [load, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPosts().then((res) => {
      userid
        ? setData(res.filter((x) => x.profileid.id === userid))
        : setData(res);
      setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userid]);

  return (
    <Fragment>
      {data &&
        !loading &&
        !load &&
        data.map((post) => (
          <Post key={post.id} post={post} data={data} setData={setData} />
        ))}
      {load && <Loading />}
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
