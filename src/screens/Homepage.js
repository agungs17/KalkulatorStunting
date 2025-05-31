import React from 'react'
import Button from '../atomic/atoms/Button';

const Homepage = ({navigation}) => {
    const handleProfile =()=> {
        navigation.navigate("Profile")
    }
    return (
        <Button onPress={handleProfile}>Profile</Button>
    );
}
 
export default Homepage;