import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import { MessageOutlined } from "@material-ui/icons/";
import Button from "@material-ui/core/Button";
import { Send } from "@material-ui/icons";

//redux
import { connect } from "react-redux";
import { writeMessage } from "../../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  writeMessage: {},
}));

function WriteMessage(props) {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const { selectedUser, writeMessage } = props;
  return (
    <>
      <TextField
        className={classes.writeMessage}
        label="Send a message..."
        multiline
        rows={2}
        rowsMax={3}
        fullWidth
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <Button
        className="submit-btn"
        color="primary"
        onClick={() => {
          writeMessage(selectedUser, content);
          setContent("");
        }}
      >
        <Send />
      </Button>
    </>
  );
}

const mapStateToProps = (state) => ({
  selectedUser: state.data.selectedUser,
});

export default connect(mapStateToProps, { writeMessage })(WriteMessage);
