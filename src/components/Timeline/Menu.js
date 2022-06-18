import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
} from "@material-ui/core";
import {
  WorkOutlineTwoTone,
  AccessTimeTwoTone,
  SettingsTwoTone,
  MessageTwoTone,
  PeopleAltTwoTone,
} from "@material-ui/icons";

const Menu = ({ user, setNav }) => {
  const [msg1, setMsg1] = useState(false);
  const [msg2, setMsg2] = useState(false);

  return (
    <div className="timeline-menu">
      <List>
        <ListItem>
          <Link
            to={{ pathname: "/profile", state: { user: user } }}
            style={{ display: "flex" }}>
            <Avatar
              src={
                user && user.profile_picture
                  ? user.profile_picture
                  : "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
              }
              alt="profile"
            />
            <ListItemText style={{ marginLeft: 15, fontWeight: 700 }}>
              {user && user.name && user.name}
            </ListItemText>
          </Link>
        </ListItem>
        <ListItem>
          <button onClick={() => setNav(2)}>
            <ListItemIcon>
              <PeopleAltTwoTone style={{ color: "#1A7FE9" }} />
            </ListItemIcon>
            <ListItemText>Friends</ListItemText>
          </button>
        </ListItem>
        <ListItem>
          <button
            style={{ cursor: "default" }}
            onMouseEnter={() => setMsg1(true)}
            onMouseLeave={() => setMsg1(false)}>
            <ListItemIcon>
              <WorkOutlineTwoTone style={{ color: "#59CCBD" }} />
            </ListItemIcon>
            <ListItemText>
              Groups{" "}
              {msg1 && (
                <span style={{ fontSize: 12, color: "grey" }}>
                  *coming soon
                </span>
              )}
            </ListItemText>
          </button>
        </ListItem>
        <ListItem>
          <Link to={{ pathname: "/profile", state: { user: user } }}>
            <button>
              <ListItemIcon>
                <AccessTimeTwoTone style={{ color: "#B230AB" }} />
              </ListItemIcon>
              <ListItemText>Account</ListItemText>
            </button>
          </Link>
        </ListItem>
        <ListItem>
          <button
            style={{ cursor: "default" }}
            onMouseEnter={() => setMsg2(true)}
            onMouseLeave={() => setMsg2(false)}>
            <ListItemIcon>
              <MessageTwoTone style={{ color: "#E96D2B" }} />
            </ListItemIcon>
            <ListItemText>
              Message{" "}
              {msg2 && (
                <span style={{ fontSize: 12, color: "grey" }}>
                  *coming soon
                </span>
              )}
            </ListItemText>
          </button>
        </ListItem>
        <ListItem>
          <Link to="/profile/setting">
            <button>
              <ListItemIcon>
                <SettingsTwoTone style={{ color: "#E8B12D" }} />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </button>
          </Link>
        </ListItem>
      </List>
    </div>
  );
};

export default Menu;
