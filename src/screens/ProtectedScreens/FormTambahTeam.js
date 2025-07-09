import React from 'react'
import Container from '../../atomic/atoms/Container';
import Header from '../../atomic/molecules/Header';
import TextInput from '../../atomic/atoms/TextInput';
import Text from '../../atomic/atoms/Text';
import Button from '../../atomic/atoms/Button';
import { View } from 'react-native';
import Image from '../../atomic/atoms/Image';

const FormTambahTeam = () => {
    return ( 
        <Container useEarlyReturn useSafeArea>
            <Header useBack title='Tambah Tim'/>
            <Container usePaddingHorizontal>
                <View style={{marginTop:5,alignItems:'center'}}>
                <Image width={300} height={300}source={require("../../assets/image/Teamimage.jpg")}/>
                </View>
                <View style={{marginTop:20}}>
                <Text fontSize={16} textStyle={{ textAlign:"center", marginBottom:15 }}>Bentuk tim posyandu-mu sekarang untuk mulai memantau pertumbuhan balita dan membagikan informasi penting secara terstruktur!</Text>
                <Text fontSize={20} fontWeight="bold" containerStyle={{ alignItems:"center",marginBottom:30 }}>Tambahkan Tim</Text>
                <TextInput title='' placeholder='Masukan Nama Team'/>
                <Button  containerStyle={{ marginTop:10, width:150}}>Kirim</Button>
                </View>
            </Container>
        </Container>
     );
}
export default FormTambahTeam;