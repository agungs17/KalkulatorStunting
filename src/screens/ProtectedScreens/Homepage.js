import React from "react";
import Button from "../../atomic/atoms/Button";
import { useAuth } from "../../context/AuthContext";
import { deleteLogout } from "../../services/apis/auth";

const Homepage = ({ navigation }) => {
  const { logoutContext } = useAuth();

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  const handleLogout = async() => {
    const res = await deleteLogout()
    if(res.status === 200) logoutContext()
  }

  return (
    <>
      <Button onPress={handleProfile}>Profile</Button>
      <Button onPress={handleLogout}>Logout</Button>
    </>
  );
};

export default Homepage;
