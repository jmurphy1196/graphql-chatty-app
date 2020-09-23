import React, { Component } from "react";
import {
  Grid,
  Typography,
  Container,
  Paper,
  makeStyles,
} from "@material-ui/core";
import "../css/home.css";
import User from "../components/users/User";
import Message from "../components/messages/Message";
import WriteMessage from "../components/messages/WriteMessage";

//redux
import { connect } from "react-redux";
import {
  getAllUsers,
  getMessages,
  setMessgesToDisplay,
  messageRecieved,
} from "../redux/actions/dataActions";
import { setUserDetails } from "../redux/actions/userActions";
//apollo
import { useSubscription, gql } from "@apollo/client";

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendsElevation: 3,
      messagesElevation: 3,
    };
    this.props.setUserDetails();
  }

  componentDidMount() {}
  componentDidUpdate(prevProp) {
    if (prevProp.userInfo !== this.props.userInfo) {
      const { email } = this.props.userInfo;
      this.props.getAllUsers(email);
      this.props.getMessages();
    }
  }

  handleElevation = (panel) => {
    if (panel === "friends") {
      this.setState({
        friendsElevation: this.state.friendsElevation === 3 ? 5 : 3,
      });
    } else if (panel === "messages") {
      this.setState({
        messagesElevation: this.state.messagesElevation === 3 ? 5 : 3,
      });
    }
  };
  render() {
    const baseImageUrl = `https://graphql-chatty-app.herokuapp.com/images/`;
    const {
      loadingUsers,
      allUsers,
      selectedUser,
      displayMessages,
      setMessgesToDisplay,
      allMessages,
      userInfo,
      messageRecieved,
    } = this.props;
    return (
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Paper
              className="friends-panel"
              elevation={this.state.friendsElevation}
              onMouseEnter={() => this.handleElevation("friends")}
              onMouseLeave={() => this.handleElevation("friends")}
            >
              <Typography
                style={{ paddingTop: "1.5rem" }}
                color="primary"
                variant="h5"
                align="center"
              >
                Users
              </Typography>
              {loadingUsers === true ? (
                <Typography variant="subtitle1" align="center">
                  Loading...
                </Typography>
              ) : (
                <>
                  {allUsers.map((user, ind) => {
                    const fullName = `${user.firstName} ${user.lastName}`;
                    const email = user.email;
                    if (email === selectedUser.email) {
                      return (
                        <User
                          key={ind}
                          isSelected
                          email={user.email}
                          username={fullName}
                          profilePic={`${baseImageUrl}${user.imageUrl}`}
                        />
                      );
                    }
                    return (
                      <User
                        key={ind}
                        email={user.email}
                        username={fullName}
                        profilePic={`${baseImageUrl}${user.imageUrl}`}
                      />
                    );
                  })}
                </>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper
              className="messages-panel"
              elevation={this.state.messagesElevation}
              onMouseEnter={() => this.handleElevation("messages")}
              onMouseLeave={() => this.handleElevation("messages")}
            >
              <Typography
                style={{ paddingTop: "1.5rem" }}
                variant="h5"
                color="primary"
                align="center"
              >
                Messages
              </Typography>
              {displayMessages
                ? displayMessages.map((message) => {
                    if (message.from === userInfo.email) {
                      return (
                        <Message
                          message={message.content}
                          createdAt={message.createdAt}
                        />
                      );
                    } else {
                      return (
                        <Message
                          createdAt={message.createdAt}
                          sender
                          message={message.content}
                        />
                      );
                    }
                  })
                : null}
              <NewMessageRecieved
                allMessages={allMessages}
                selectedUser={selectedUser}
                messageRecieved={messageRecieved}
              />
            </Paper>
            <Paper className="write-panel">
              <Grid item xs={12} md={8} className="write-panel_grid">
                <WriteMessage />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const NEW_MESSAGE_RECIEVED = gql`
  subscription getMessage {
    messageAdded {
      from
      to
      content
      createdAt
    }
  }
`;

const NewMessageRecieved = (props) => {
  const { selectedUser, messageRecieved, allMessages } = props;
  const { data, loading, error } = useSubscription(NEW_MESSAGE_RECIEVED);

  if (loading) {
  }
  if (data) {
    console.log("got some data!");
    const indexOfMessage = allMessages.findIndex(
      (m) => m.createdAt === data.messageAdded.createdAt
    );
    if (indexOfMessage === -1) {
      messageRecieved(data.messageAdded, selectedUser);
    }
  }
  if (error) {
    console.log(error);
  }

  return <></>;
};

const mapStateToProps = (state) => ({
  loadingUsers: state.data.loadingUsers,
  userInfo: state.user.credentials,
  allUsers: state.data.users,
  selectedUser: state.data.selectedUser,
  displayMessages: state.data.displayMessages,
  allMessages: state.data.messages,
});

export default connect(mapStateToProps, {
  getAllUsers,
  setUserDetails,
  getMessages,
  setMessgesToDisplay,
  messageRecieved,
})(home);
