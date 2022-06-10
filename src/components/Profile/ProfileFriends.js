import React from "react";

const ProfileFriends = ({
  profile: { friend_list },
  getProfile,
  setLoading,
  setNav,
}) => {
  return (
    <div className="about-friends">
      <h3>Friends</h3>
      <span>
        <a>Friend Requests</a>
        <a>Suggestions</a>
      </span>
      <div className="list">
        {friend_list.map((x, i) => (
          <div
            className="item cursor-pointer"
            onClick={() => {
              setLoading(true);
              setNav(1);
              getProfile(x.id).then((res) => setLoading(false));
            }}>
            <img
              src={
                x.profile_picture
                  ? x.profile_picture
                  : "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
              }
            />
            <p>{x.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileFriends;
