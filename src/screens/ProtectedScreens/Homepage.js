import React from "react";
import Button from "../../atomic/atoms/Button";
import { deleteLogout } from "../../services/apis/auth";
import { useAuth } from "../../context/AuthContext";
import Text from "../../atomic/atoms/Text";

const Homepage = ({ navigation }) => {
  const { user } = useAuth() || {}
  const { name, email, nik } = user
  
  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  const handleLogout = async() => {
    await deleteLogout()
  }

  return (
    <>
      <Text>Nama : {name}</Text>
      <Text>Email : {email}</Text>
      <Text>NIK : {nik}</Text>
      <Button onPress={handleProfile}>Profile</Button>
      <Button onPress={handleLogout}>Logout</Button>
    </>
  );
};

export default Homepage;
