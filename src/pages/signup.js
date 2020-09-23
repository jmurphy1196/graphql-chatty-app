import React, { useState } from "react";
import {
  Grid,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "../css/signup.css";
//redux
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

function Signup({ loading, signupUser, history, errors }) {
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
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
                      setData({ ...data, email: e.target.value })
                    }
                  />
                  <TextField
                    name="firstName"
                    label="First Name"
                    fullWidth
                    onChange={(e) =>
                      setData({ ...data, firstName: e.target.value })
                    }
                  />
                  <TextField
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    onChange={(e) =>
                      setData({ ...data, lastName: e.target.value })
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
                      setData({ ...data, password: e.target.value })
                    }
                  />
                  <TextField
                    helperText={errors.confirmPassword}
                    error={errors.confirmPassword}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    onChange={(e) =>
                      setData({ ...data, confirmPassword: e.target.value })
                    }
                  />
                  <Button
                    color="primary"
                    onClick={() => signupUser(data, history)}
                  >
                    Signup
                  </Button>
                </form>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" align="center">
                  Already have an account? login <Link to="/login">here</Link>
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
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <TextField
                  name="firstName"
                  label="First Name"
                  fullWidth
                  onChange={(e) =>
                    setData({ ...data, firstName: e.target.value })
                  }
                />
                <TextField
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  onChange={(e) =>
                    setData({ ...data, lastName: e.target.value })
                  }
                />
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  onChange={(e) =>
                    setData({ ...data, confirmPassword: e.target.value })
                  }
                />
                <Button
                  color="primary"
                  onClick={() => signupUser(data, history)}
                >
                  Signup
                </Button>
              </form>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="center">
                Already have an account? login <Link to="/login">here</Link>
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  errors: state.UI.errors,
});

export default connect(mapStateToProps, { signupUser })(Signup);
