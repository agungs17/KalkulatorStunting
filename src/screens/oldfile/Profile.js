import React from 'react'
import Text from '../../atomic/atoms/Text';
import Container from '../../atomic/atoms/Container';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../atomic/molecules/Header';
import { Dimensions, StyleSheet, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Image from '../../atomic/atoms/Image';
import Button from '../../atomic/atoms/Button';
import InfoBox from '../../atomic/atoms/InfoBox';
import Editprofile from './Editprofile';

const { width , height } = Dimensions.get("window")


const Profile = () => {
    const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Yakin ingin keluar?",
      [
        { text: "Batal", style: "cancel" },
        { 
          text: "Ya",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
  };
    
    return ( 
        
    <Container  >
        <Header title='PROFILE'/>
         <ScrollView>
            <Container >
            <View style={[styles.card,styles.containerRow]}>
                <View style={styles.containerColoumn}>
        
                <Text color='white' fontSize={18} fontWeight="600">
                Hai! Selamat datang di Aplikasi Posyandu Ananda 👶
                </Text>
                <Text color='white' fontSize={14}>
                 Yuk mulai pantau tumbuh kembang si kecil dengan mudah!
                </Text>
                <View style={styles.colomlogout}> 
                <Button containerStyle={{  width:50 }}  onPress={() => navigation.navigate('Editprofile') } >Edit</Button>
                <Button containerStyle={{ margin:10, width:80 }} onPress={handleLogout}>Logout</Button>
                </View>
                </View>
            </View>
             {/* no tlp bidan,data balita, */}
            </Container>
         </ScrollView>
    </Container>
     );
}
const styles = StyleSheet.create({
    containerRow:{
        flexDirection: 'row',
        paddingTop:10, 
        padding:10,
        justifyContent: 'space-between',
    },
    containerColoumn:{
        flexDirection:"column",
        paddingLeft:20,
        paddingTop:30,
    },
    colomlogout:{
        flexDirection: 'row',      // Agar sejajar horizontal
        alignItems: 'center',      // Sejajarkan secara vertikal
    },
    card:{
        backgroundColor: '#90C67C',
        padding: 16,
        height:200,
        borderRadius: 8,
        margin: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonBio:{
        marginTop:10,
    }
})
export default Profile;