import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  messagePanel: {
    marginTop: "1rem",
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    float: "right",
    paddingBottom: "5%",

    marginRight: "3rem",
  },
  messageCard: {
    borderRadius: "16px",
    padding: "0.5rem 2rem",
  },
  messageCardSender: {
    borderRadius: "16px",
    padding: "0.5rem 2rem",
    backgroundColor: "rgba(112, 124, 240, 1)",
  },
  date: {
    position: "relative",
    paddingRight: "10px",
  },
}));

function Message(props) {
  const classes = useStyles();
  let minutesAgo = dayjs(props.createdAt).diff(new Date(), "minute");
  minutesAgo *= -1;
  let hours = 0;
  let minutes = 0;

  while (minutesAgo > 0) {
    if (minutesAgo >= 60) {
      hours += 1;
      minutesAgo -= 60;
    } else if (minutesAgo >= 1 && minutesAgo <= 59) {
      minutes += 1;
      minutesAgo -= 1;
    }
  }
  let date;

  if (hours > 0) {
    date = `${hours}h and ${minutes}m ago`;
  } else {
    date = `${minutes}m ago`;
  }

  return (
    <Grid item className={classes.messagePanel}>
      {props.sender ? (
        <>
          <Typography
            variant="subtitle2"
            className={classes.date}
            color="textPrimary"
          >
            {date}
          </Typography>
          <Card className={classes.messageCard}>
            <Typography>{props.message}</Typography>
          </Card>
        </>
      ) : (
        <>
          <Typography
            variant="subtitle2"
            className={classes.date}
            color="textSecondary"
          >
            {date}
          </Typography>

          <Card className={classes.messageCardSender}>
            <Typography style={{ color: "#FFF" }}>{props.message}</Typography>
          </Card>
        </>
      )}
    </Grid>
  );
}

export default Message;
