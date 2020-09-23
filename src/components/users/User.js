import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

//redux
import { connect } from "react-redux";
import {
  setActiveUser,
  setMessgesToDisplay,
} from "../../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  profileImg: {
    width: "5rem",
    height: "80%",
    borderRadius: "50%",
    objectFit: "cover",
    border: "solid rgba(0, 0, 0, 0.1) 1px",
  },
  profilePanel: {
    display: "flex",
    justifyContent: "space-around",
    height: "6rem",
    alignItems: "center",
    padding: "0 2rem",
    cursor: "pointer",
    marginTop: "20px",
  },
}));

function User(props) {
  const {
    setActiveUser,
    email,
    setMessgesToDisplay,
    allMessages,
    isSelected,
    selectedUser,
  } = props;

  const classes = useStyles();
  const theme = useTheme();
  const [elevation, setelevation] = useState({
    elevation: isSelected ? 5 : 0,
    textColor: isSelected ? "textPrimary" : "textSecondary",
  });
  if (
    selectedUser.email !== email &&
    elevation.elevation !== 0 &&
    elevation.elevation !== 6
  ) {
    setelevation({ elevation: 0, textColor: "textSecondary" });
  }

  return (
    <Paper
      elevation={elevation.elevation}
      className={classes.profilePanel}
      onClick={() => {
        setActiveUser({
          email: email,
        });
        setMessgesToDisplay(allMessages, email);
        setelevation({ elevation: 5, textColor: "textPrimary" });
      }}
      onMouseEnter={() =>
        setelevation({ elevation: 6, textColor: "textPrimary" })
      }
      onMouseLeave={() =>
        setelevation({
          elevation: isSelected ? 5 : 0,
          textColor: isSelected ? "textPrimary" : "textSecondary",
        })
      }
    >
      <img src={props.profilePic} className={classes.profileImg} />
      <Typography color={elevation.textColor} variant="body1">
        {props.username}
      </Typography>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  allMessages: state.data.messages,
  selectedUser: state.data.selectedUser,
});

export default connect(mapStateToProps, { setActiveUser, setMessgesToDisplay })(
  User
);
