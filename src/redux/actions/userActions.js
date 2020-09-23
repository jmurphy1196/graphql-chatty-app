import axios from "axios";
import { gql } from "@apollo/client";
import {
  SET_USER,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  STOP_LOADING_UI,
  UPLOAD_IMAGE,
  STOP_LOADING_USERS,
  SET_ERRORS,
  CLEAR_ERRORS,
} from "../types";

const URI = "https://graphql-chatty-app.herokuapp.com/graphql";
const IMAGE_URI = "https://graphql-chatty-app.herokuapp.com/upload-img";

export const setUserDetails = () => (dispatch) => {
  const token = localStorage.getItem("userToken");

  dispatch({ type: LOADING_UI });
  axios
    .post(URI, {
      query: `
                    query getUser{
                        getUserDetails{
                            email firstName lastName id role imageUrl
                        }
                    }
            `,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((resData) => {
      if (resData.data.data.getUserDetails) {
        dispatch({ type: STOP_LOADING_UI });
        dispatch({ type: SET_USER, payload: resData.data.data.getUserDetails });
      }
    })
    .catch((err) => console.log(err));
};

export const loginUser = (userData, histroy) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(URI, {
      query: `
      query login($email: String! $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
      `,
      variables: {
        email: userData.email,
        password: userData.password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((resData) => {
      console.log(resData);
      dispatch({ type: STOP_LOADING_UI });
      if (!resData.data.errors) {
        const token = resData.data.data.login.token;
        localStorage.setItem("userToken", token);
        axios.defaults.headers.authorization = `Bearer ${token}`;
        dispatch({ type: CLEAR_ERRORS });
        dispatch(setUserDetails());
      } else {
        console.log(resData.data.errors[0].extensions);
        dispatch({
          type: SET_ERRORS,
          payload: resData.data.errors[0].extensions,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userToken");
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const signupUser = (inputData, history) => (dispatch) => {
  console.log(inputData);
  dispatch({ type: LOADING_UI });
  axios
    .post(URI, {
      query: `
          mutation signup($email: String!, $firstName: String!, $lastName: String! $password: String! $confirmPassword: String!){
              signup(email: $email, firstName: $firstName, lastName: $lastName, password: $password, confirmPassword: $confirmPassword){
                email
              }
          }
      `,
      variables: {
        email: inputData.email,
        firstName: inputData.firstName,
        lastName: inputData.lastName,
        password: inputData.password,
        confirmPassword: inputData.confirmPassword,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((resData) => {
      dispatch({ type: STOP_LOADING_UI });
      if (!resData.data.errors) {
        dispatch({ type: CLEAR_ERRORS });
        console.log(resData.data.data.signup.email);
        history.push("/login");
      } else {
        dispatch({
          type: SET_ERRORS,
          payload: resData.data.errors[0].extensions,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: STOP_LOADING_UI });
    });
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(IMAGE_URI, formData)
    .then((resData) => {
      console.log(resData);
    })
    .catch((err) => console.log(err));
};
