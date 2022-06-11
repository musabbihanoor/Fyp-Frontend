import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import {
  Button,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import { MenuBook, Group, Home, Settings } from "@material-ui/icons";

const Navbar = ({
  setNav,
  nav,
  auth: { isAuthenticated, loading, user },
  logout,
}) => {
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>
        <Link to={{ pathname: "/profile", state: { user: user } }}>
          Profile
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/profile/setting">My Account</Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      {location.pathname === "/timeline" && (
        <>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit">
              <Badge color="error">
                <Home
                  color={nav === 1 ? "secondary" : "inherit"}
                  onClick={() => setNav(1)}
                />
              </Badge>
            </IconButton>
            <p>Home</p>
          </MenuItem>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit">
              <Badge color="error">
                <Group
                  color={nav === 2 ? "secondary" : "inherit"}
                  onClick={() => setNav(2)}
                />
              </Badge>
            </IconButton>
            <p>Friends</p>
          </MenuItem>
        </>
      )}

      <MenuItem>
        <Link
          to={{ pathname: "/profile", state: { user: user } }}
          style={{ display: "flex" }}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit">
            <Badge color="error">
              <AccountCircle
                color={
                  location.pathname === "/profile" ? "secondary" : "inherit"
                }
              />
            </Badge>
          </IconButton>
          <p>Profile</p>
        </Link>
      </MenuItem>

      <MenuItem>
        <Link to="/profile/setting" style={{ display: "flex" }}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit">
            <Badge color="error">
              <Settings
                color={
                  location.pathname === "/profile/setting"
                    ? "secondary"
                    : "inherit"
                }
              />
            </Badge>
          </IconButton>
          <p>Setting</p>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <Fragment>
      {isAuthenticated && !loading && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar color="default" position="fixed">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="open drawer"
                sx={{ mr: 2 }}>
                <MenuBook />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}>
                <Link to="/timeline">NIZAM E ILAHI</Link>
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {location.pathname === "/timeline" && (
                  <>
                    <IconButton
                      size="large"
                      aria-label="show 4 new mails"
                      color={nav === 1 ? "secondary" : "inherit"}
                      onClick={() => setNav(1)}>
                      <Home>{/* <a href='/timeline' /> */}</Home>
                    </IconButton>
                    <IconButton
                      size="large"
                      aria-label="show 4 new mails"
                      color={nav === 2 ? "secondary" : "inherit"}
                      onClick={() => setNav(2)}>
                      <Group>{/* <a href='/timeline' /> */}</Group>
                    </IconButton>
                  </>
                )}
                <Link to={{ pathname: "/profile", state: { user: user } }}>
                  <IconButton
                    size="large"
                    color={
                      location.pathname === "/profile" ? "secondary" : "inherit"
                    }
                    aria-label="show 4 new mails">
                    <AccountCircle />
                  </IconButton>
                </Link>
                <Link to="/profile/setting">
                  <IconButton
                    size="large"
                    color={
                      location.pathname === "/profile/setting"
                        ? "secondary"
                        : "inherit"
                    }
                    aria-label="show 4 new mails">
                    <Settings />
                  </IconButton>
                </Link>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit">
                  <MoreIcon />
                </IconButton>
              </Box>
              <Button
                variant="contained"
                style={{ marginLeft: 20 }}
                onClick={() => logout()}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </Box>
      )}
    </Fragment>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
