import React, { Component, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  Grid,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "../css/login.css";

//redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const Login = ({ loginUser, history, loadingUI, errors }) => {
  const [userData, setuserData] = useState({
    email: "",
    password: "",
    submit: false,
  });

  if (errors) {
    return (
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Paper className="login-panel" elevation={5}>
              <Grid className="login-logo_grid" container xs={12}>
                <img
                  id="login-logo"
                  src="https://img.pngio.com/chat-icon-svg-png-icon-free-download-381628-onlinewebfontscom-chat-icon-png-980_908.png"
                />
              </Grid>
              <Grid xs={12} item className="form-grid">
                <form noValidate className="login-form">
                  <TextField
                    helperText={errors.email}
                    error={errors.email}
                    name="email"
                    label="Email"
                    fullWidth
                    onChange={(e) =>
                      setuserData({
                        email: e.target.value,
                        password: userData.password,
                      })
                    }
                  />
                  <TextField
                    error={errors.password}
                    helperText={errors.password}
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    onChange={(e) =>
                      setuserData({
                        email: userData.email,
                        password: e.target.value,
                      })
                    }
                  />
                  <Button
                    type="button"
                    color="primary"
                    disabled={loadingUI}
                    onClick={() => loginUser(userData, history)}
                  >
                    Login
                  </Button>
                </form>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  style={{ marginBottom: "2rem" }}
                  variant="subtitle2"
                  align="center"
                >
                  dont have an account? sign up <Link to="/signup">here</Link>
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Paper className="login-panel" elevation={5}>
            <Grid className="login-logo_grid" container xs={12}>
              <img
                id="login-logo"
                src="https://img.pngio.com/chat-icon-svg-png-icon-free-download-381628-onlinewebfontscom-chat-icon-png-980_908.png"
              />
            </Grid>
            <Grid xs={12} item className="form-grid">
              <form noValidate className="login-form">
                <TextField
                  name="email"
                  label="Email"
                  fullWidth
                  onChange={(e) =>
                    setuserData({
                      email: e.target.value,
                      password: userData.password,
                    })
                  }
                />
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  onChange={(e) =>
                    setuserData({
                      email: userData.email,
                      password: e.target.value,
                    })
                  }
                />
                <Button
                  type="button"
                  color="primary"
                  disabled={loadingUI}
                  onClick={() => loginUser(userData, history)}
                >
                  Login
                </Button>
              </form>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="center">
                dont have an account? sign up <Link to="/signup">here</Link>
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  loadingUI: state.UI.loading,
  errors: state.UI.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
