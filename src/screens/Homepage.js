import React, { useState } from 'react';
import Container from '../atomic/atoms/Container';
import Header from '../atomic/molecules/Header';
import Button from '../atomic/atoms/Button';
import { ScrollView } from 'react-native-gesture-handler';
import TextInput from '../atomic/atoms/TextInput';
import {isNumber, isEmpty} from 'lodash-es';
import { AxiosInstance } from '../services/AxiosInstance';
import { PARAM_SERVICES } from '../utils/constants';
import { generateZScore, getRoundDownHeight, getTypeChild } from '../utils/script';
import InfoBox from '../atomic/atoms/InfoBox';
import { infoColors } from '../utils/themes';

const Homepage = () => {
    const [form, setForm] = useState({
        name : '',
        gender : '',
        age : '',
        weight : '',
        height : ''
    })

    const [zScore, setZScore] = useState({
        berat : {},
        tinggi : {},
        tinggivsberat : {}
    })

    const {berat, tinggi, tinggivsberat} = zScore
    const {name, gender, age, weight, height} = form

    const handleChange = (name, value) => {
        setForm({
            ...form,
            [name]: value
        })
    }


    const handleSubmit = () => {
        Promise.all([
            AxiosInstance.get(`/${PARAM_SERVICES[0]}/${gender}/${age}.json`),
            AxiosInstance.get(`/${PARAM_SERVICES[1]}/${gender}/${age}.json`),
            AxiosInstance.get(`/${PARAM_SERVICES[2]}/${gender}/${getTypeChild(age)}/${getRoundDownHeight(height)}.json`),
        ])
        .then(([berat, tinggi, tinggivsberat]) => {
            const zScoreBerat = generateZScore(weight, berat.data);
            const zScoreTinggi = generateZScore(height, tinggi.data);
            const zScoreTinggiVsBerat = generateZScore(weight, tinggivsberat.data);
            setZScore({ berat: zScoreBerat, tinggi: zScoreTinggi, tinggivsberat: zScoreTinggiVsBerat })
        })
        .catch(error => {
            console.error('Salah satu request gagal:', error);
        });
    }

    return (
        <Container useEarlyReturn useSafeArea>
            <Header title='Homepage'/>
            <ScrollView>
                <Container usePaddingHorizontal style={{ marginTop: 10 }}>
                    <TextInput
                      title='Nama Lengkap*'
                      placeholder='Masukan Nama Lengkap'
                      value={name}
                      onChangeText={(value) => handleChange('name', value)}
                    />
                    <TextInput
                      maxLength={1}
                      title='Jenis Kelamin*'
                      placeholder='Masukan Jenis Kelamin'
                      value={gender}
                      onChangeText={(value) => handleChange('gender', value)}
                    />
                    <TextInput
                      title='Usia (Bulan)*'
                      placeholder='Masukan Usia (Bulan)'
                      value={age}
                      keyboardType='numeric'
                      onChangeText={(value) => handleChange('age', value)}
                    />
                    <TextInput
                      title='Berat Badan*'
                      placeholder='Masukan Berat Badan'
                      value={weight}
                      keyboardType='numeric'
                      onChangeText={(value) => handleChange('weight', value)}
                    />
                    <TextInput
                      title='Tinggi Badan*'
                      placeholder='Masukan Tinggi Badan'
                      value={height}
                      keyboardType='numeric'
                      onChangeText={(value) => handleChange('height', value)}
                    />
                    {!isEmpty(berat) && <InfoBox color={infoColors(berat?.category)} containerStyle={{ marginBottom : 8 }} title={`Z-Score Berat Badan :\n${berat?.zScore} (${berat?.category})`} />}
                    {!isEmpty(tinggi) && <InfoBox color={infoColors(tinggi?.category)} containerStyle={{ marginBottom : 8 }} title={`Z-Score Tinggi Badan :\n${tinggi?.zScore} (${tinggi?.category})`} />}
                    {!isEmpty(tinggivsberat) && <InfoBox color={infoColors(tinggivsberat?.category)} containerStyle={{ marginBottom : 8 }} title={`Z-Score Berat Badan Menurut Tinggi :\n${tinggivsberat?.zScore} (${tinggivsberat?.category})`} />}
                    <Button disabled={!(!isEmpty(name) && !isEmpty(gender) && !isEmpty(age) && !isEmpty(weight) && !isEmpty(height))} onPress={handleSubmit}>
                        Submit
                    </Button>
                </Container>
            </ScrollView>
        </Container>
    );
}
 
export default Homepage;