import React from "react";
import {
  Grid,
  Typography,
  Paper,
  Container,
  CircularProgress,
  IconButton,
  TextField,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import "../css/profile.css";
//redux
import { connect } from "react-redux";
import { setUserDetails, uploadImage } from "../redux/actions/userActions";

const baseImageUrl = `https://graphql-chatty-app.herokuapp.com/images/`;

function EditProfile({ userInfo, setUserDetails, loading, uploadImage }) {
  if (!userInfo.email) {
    setUserDetails();
  }

  const handleEditPicture = () => {
    const fileInput = document.getElementById("photo");
    fileInput.click();
  };
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("photo", image, image.name);
    uploadImage(formData);
    setTimeout(() => {
      setUserDetails();
    }, 2000); //TODO fix this
  };

  return (
    <Container>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Paper className="profile-panel">
            <Typography align="center" color="primary" variant="h4">
              Edit Profile
            </Typography>
            {loading ? (
              <Grid
                container
                alignItems="center"
                alignContent="center"
                justify="center"
              >
                <CircularProgress />
              </Grid>
            ) : (
              <>
                <Grid
                  container
                  xs={12}
                  className="image-container"
                  alignContent="center"
                  justify="center"
                  alignItems="center"
                  direction="column"
                >
                  <img
                    id="profileImage"
                    src={`${baseImageUrl}${userInfo.imageUrl}`}
                  />
                  <IconButton size="large" onClick={handleEditPicture}>
                    <Edit />
                    <input
                      type="file"
                      id="photo"
                      name="photo"
                      hidden
                      onChange={handleImageChange}
                    />
                  </IconButton>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  alignContent="center"
                  justify="center"
                  xs={12}
                  direction="column"
                >
                  <Typography title="Email" variant="body1">
                    {userInfo.email}
                  </Typography>
                  <Typography>
                    {`${userInfo.firstName} ${userInfo.lastName}`}
                  </Typography>
                </Grid>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  userInfo: state.user.credentials,
  loading: state.UI.loading,
});

export default connect(mapStateToProps, { setUserDetails, uploadImage })(
  EditProfile
);
