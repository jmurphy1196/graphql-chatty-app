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

const initialState = {
  users: [],
  selectedUser: {},
  messages: [],
  displayMessages: null,
  loadingUsers: false,
};

export default function (state = initialState, action) {
  let displayMessages = state.displayMessages;
  let messages = state.messages;
  switch (action.type) {
    case LOADING_ALL_USERS:
      return {
        ...state,
        loadingUsers: true,
      };
    case LOADING_ALL_USERS:
      return {
        ...state,
        loadingUsers: true,
      };
    case STOP_LOADING_USERS:
      return {
        ...state,
        loadingUsers: false,
      };
    case SET_ALL_USERS:
      return {
        ...state,
        users: [...action.payload],
      };
    case SET_RECIPIENT:
      return {
        ...state,
        selectedUser: { ...action.payload },
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: [...action.payload],
      };
    case SET_MESSAGES_TO_DISPLAY:
      return {
        ...state,
        displayMessages: [...action.payload],
      };
    case WRITE_MESSAGE:
      return {
        ...state,
        displayMessages: [...displayMessages, action.payload],
        messages: [...messages, action.payload],
      };

    case MESSAGE_RECIEVED:
      const indexOfMessage = messages.findIndex(
        (m) => m.createdAt === action.payload.message.createdAt
      );
      if (indexOfMessage > -1) {
        return {
          ...state,
        };
      }
      if (
        action.payload.message.to === action.payload.selectedUser.email ||
        action.payload.message.from === action.payload.selectedUser.email
      ) {
        return {
          ...state,
          displayMessages: [...displayMessages, action.payload.message],
          messages: [...messages, action.payload.message],
        };
      } else {
        return {
          ...state,
          messages: [...messages, action.payload.message],
        };
      }

    default:
      return state;
  }
}
