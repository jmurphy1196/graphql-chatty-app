import React from "react";
import Navbar from "./components/Navbar";
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import myTheme from "./theme.json";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./pages/login";
import home from "./pages/home";
import Signup from "./pages/signup";
import EditProfile from "./pages/editProfile";
import "./App.css";
//jsonwebtoken
import jwt from "jsonwebtoken";
import axios from "axios";
//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { logoutUser } from "./redux/actions/userActions";
import { SET_AUTHENTICATED } from "./redux/types";
//auth routes
import AuthRoute from "./util/AuthRoute";
import UnAuthRoute from "./util/UnAuthRoute";

//apollo
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./apolloSetup";

const theme = createMuiTheme(myTheme);

const token = localStorage.userToken;

if (token) {
  axios.defaults.headers.authorization = `Bearer ${token}`;

  const decodedToken = jwt.decode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
  }
}

function App() {
  console.log(theme);
  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <Provider store={store}>
            <Router>
              <Navbar />

              <Switch>
                <AuthRoute exact path="/" component={home} />
                <UnAuthRoute exact path="/login" component={Login} />
                <UnAuthRoute exact path="/signup" component={Signup} />
                <AuthRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>
            </Router>
          </Provider>
        </ApolloProvider>
      </MuiThemeProvider>
    </React.Fragment>
  );
}

export default App;
