import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";

import Landing from "./components/User/Landing";
import Timeline from "./components/Timeline/Timeline";
import Navbar from "./components/Layout/Navbar";
import Profile from "./components/Profile/Profile";
import ProfileSetting from "./components/Profile/ProfileSetting";
import VerifyEmail from "./components/User/VerifyEmail";
import Group from "./components/Groups/Group";
import Page from "./components/Page/Page";
import Confirm from "./components/Popup/Confirm";
import Popup from "./components/Popup/Popup";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

import "./App.css";

const App = () => {
  const [nav, setNav] = useState(1);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Navbar setNav={setNav} nav={nav} />
          <Switch>
            <Route exact path="/" component={Landing} />
            <PrivateRoute exact path="/profile" component={() => <Profile />} />
            <PrivateRoute
              exact
              path="/timeline"
              component={() => <Timeline nav={nav} setNav={setNav} />}
            />
            <Route exact path="/profile/setting" component={ProfileSetting} />
            <Route exact path="/verify" component={VerifyEmail} />
            <Route exact path="/group" component={Group} />
            <Route exact path="/page" component={Page} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
