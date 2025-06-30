import React from "react";
import Button from "../../atomic/atoms/Button";
import { deleteLogout } from "../../services/apis/auth";

const Homepage = ({ navigation }) => {
  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  const handleLogout = async() => {
    await deleteLogout()
  }

  return (
    <>
      <Button onPress={handleProfile}>Profile</Button>
      <Button onPress={handleLogout}>Logout</Button>
    </>
  );
};

export default Homepage;
