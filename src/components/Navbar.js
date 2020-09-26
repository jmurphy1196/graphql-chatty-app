import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import { Link, Redirect } from "react-router-dom";
import { Settings, PortraitOutlined, Message } from "@material-ui/icons";

//redux
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    textDecoration: "none",
    color: "white",
  },
}));

function Navbar({ authenticated, logoutUser }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Grid container justify="center">
            <Tooltip title="Messages">
              <Link to="/" className={classes.btn}>
                <Button color="inherit">
                  <Message />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip title="My Profile">
              <Link to="/edit-profile" className={classes.btn}>
                <Button color="inherit">
                  <PortraitOutlined />
                </Button>
              </Link>
            </Tooltip>
          </Grid>
          {authenticated === false ? (
            <Link to="/login" className={classes.btn}>
              <Button color="inherit">Login</Button>
            </Link>
          ) : (
            <Link to="/login" className={classes.btn}>
              <Button color="inherit" onClick={() => logoutUser()}>
                Logout
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
