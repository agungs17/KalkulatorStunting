import React from 'react'
import Text from '../../atomic/atoms/Text';
import Button from '../../atomic/atoms/Button';
import Container from '../../atomic/atoms/Container';
import { useNavigation } from '@react-navigation/native';
import TextInput from '../../atomic/atoms/TextInput';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../atomic/molecules/Header';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@react-native-vector-icons/material-design-icons';



const Editprofile = () => {
    const navigation = useNavigation();
    return ( 
    <Container useSafeArea useEarlyReturn>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={50} color="#000" />
        <Text style={styles.text}>Kembali</Text>
        </TouchableOpacity>
        <ScrollView style={{ padding:30 }}>
            <TextInput 
            title='Nama Lengkap'
            placeholder='Masukan Nama Lengkap'
            />
            <TextInput 
            title='Alamat'
            placeholder='Masukan Nama Lengkap'
            />
            <TextInput 
            title='No.telp'
            placeholder='Contoh : 0812 3456 7895'
            keyboardType='numeric'
             maxLength={13}
            />
            <TextInput 
            title='NIK'
            placeholder='Masukan Nama Lengkap'
            keyboardType='numeric'
             maxLength={16}
            />
            <TextInput 
            title='Kecamatan'
            placeholder='Masukan Nama Lengkap'
            />
            <TextInput 
            title='Kab/Kota'
            placeholder='Masukan Nama Lengkap'
            />
            <Button>Submit</Button>

        </ScrollView>
    </Container>    
     );
}
const styles = StyleSheet.create({
    button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
})
export default Editprofile;