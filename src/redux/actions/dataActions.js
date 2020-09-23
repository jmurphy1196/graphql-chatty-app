import {
  GET_ALL_USERS,
  GET_MESSAGES,
  LOADING_ALL_USERS,
  SUBSCRIBE_MESSAGES,
  SET_RECIPIENT,
  STOP_LOADING_USERS,
  SET_ALL_USERS,
  SET_MESSAGES_TO_DISPLAY,
  WRITE_MESSAGE,
  MESSAGE_RECIEVED,
} from "../types";

import axios from "axios";

const URI = "https://graphql-chatty-app.herokuapp.com/graphql";

export const getAllUsers = (usersEmail) => (dispatch) => {
  dispatch({ type: LOADING_ALL_USERS });
  axios
    .post(URI, {
      query: `
                query getUsers{
                    getAllUsers{
                        email firstName lastName imageUrl
                    }
                }
            `,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((resData) => {
      console.log(resData);
      const users = resData.data.data.getAllUsers.filter(
        (user) => user.email !== usersEmail
      );

      dispatch({ type: SET_ALL_USERS, payload: users });
      dispatch({ type: STOP_LOADING_USERS });
    })
    .catch((err) => console.log(err));
};

export const setActiveUser = (user) => (dispatch) => {
  dispatch({ type: SET_RECIPIENT, payload: user });
};

export const getMessages = () => (dispatch) => {
  axios
    .post(URI, {
      query: `
                query getUserMessages{
                    getMessages{
                        from to content createdAt
                    }
                }
            `,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((resData) => {
      console.log(resData);
      dispatch({ type: GET_MESSAGES, payload: resData.data.data.getMessages });
    })
    .catch((err) => console.log(err));
};

export const setMessgesToDisplay = (messages, email) => (dispatch) => {
  console.log("this is the user to filter");
  console.log(email);
  messages = messages.filter((m) => m.from === email || m.to === email);
  console.log("afte filter");
  console.log(messages);
  dispatch({ type: SET_MESSAGES_TO_DISPLAY, payload: messages });
};

export const writeMessage = (recipient, content) => (dispatch) => {
  axios
    .post(URI, {
      query: `
                mutation submitMessage($to: String! $content: String!){
                    submitMessage(to: $to, content: $content){
                        from to content createdAt
                    }
                }
            `,
      variables: {
        to: recipient.email,
        content: content,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((resData) => {
      console.log(resData);
      dispatch({
        type: WRITE_MESSAGE,
        payload: {
          ...resData.data.data.submitMessage,
          selectedUser: recipient,
        },
      });
    })
    .catch((err) => console.log(err));
};

export const messageRecieved = (message, recipient) => (dispatch) => {
  dispatch({
    type: MESSAGE_RECIEVED,
    payload: { message: message, selectedUser: recipient },
  });
};
