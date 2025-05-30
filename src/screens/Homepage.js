import React, { useState } from 'react';
import Container from '../atomic/atoms/Container';
import Header from '../atomic/molecules/Header';
import Button from '../atomic/atoms/Button';
import { ScrollView } from 'react-native-gesture-handler';
import TextInput from '../atomic/atoms/TextInput';
import {isEmpty} from 'lodash-es';
import { generateZScore, updateStateField } from '../utils/script';
import InfoBox from '../atomic/atoms/InfoBox';
import { infoColors } from '../utils/themes';
import { getDataBerat } from '../services/collections/BeratCollections';
import { getDataTinggi } from '../services/collections/TinggiCollections';
import { getDataTinggiVsBerat } from '../services/collections/TinggiVsBeratCollections';

const Homepage = () => {
    const [loading, setLoading] = useState(false)
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

    const handleSubmit = async() => {
        setLoading(true)
        setZScore({})
        let dataBerat = await getDataBerat(gender, age)
        dataBerat = generateZScore(weight, dataBerat?.data?.[0]);
        let dataTinggi = await getDataTinggi(gender, age)
        dataTinggi = generateZScore(height, dataTinggi?.data?.[0]);
        let dataTinggiVsBerat = await getDataTinggiVsBerat(gender, age, height)
        dataTinggiVsBerat = generateZScore(weight, dataTinggiVsBerat?.data?.[0]);
        setZScore({ berat: dataBerat, tinggi: dataTinggi, tinggivsberat: dataTinggiVsBerat })
        setLoading(false)
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
                      onChangeText={(value) => updateStateField(setForm, 'name', value)}
                    />
                    <TextInput
                      maxLength={1}
                      title='Jenis Kelamin*'
                      placeholder='Masukan Jenis Kelamin'
                      value={gender}
                      onChangeText={(value) => updateStateField(setForm, 'gender', value)}
                    />
                    <TextInput
                      title='Usia (Bulan)*'
                      placeholder='Masukan Usia (Bulan)'
                      value={age}
                      keyboardType='numeric'
                      onChangeText={(value) => updateStateField(setForm, 'age', value)}
                    />
                    <TextInput
                      title='Berat Badan*'
                      placeholder='Masukan Berat Badan'
                      value={weight}
                      keyboardType='numeric'
                      onChangeText={(value) => updateStateField(setForm, 'weight', value)}
                    />
                    <TextInput
                      title='Tinggi Badan*'
                      placeholder='Masukan Tinggi Badan'
                      value={height}
                      keyboardType='numeric'
                      onChangeText={(value) => updateStateField(setForm, 'height', value)}
                    />
                    {!isEmpty(berat) && <InfoBox color={infoColors(berat?.category)} containerStyle={{ marginBottom : 8 }} title={`Z-Score Berat Badan :\n${berat?.zScore} (${berat?.category})`} />}
                    {!isEmpty(tinggi) && <InfoBox color={infoColors(tinggi?.category)} containerStyle={{ marginBottom : 8 }} title={`Z-Score Tinggi Badan :\n${tinggi?.zScore} (${tinggi?.category})`} />}
                    {!isEmpty(tinggivsberat) && <InfoBox color={infoColors(tinggivsberat?.category)} containerStyle={{ marginBottom : 8 }} title={`Z-Score Berat Badan Menurut Tinggi :\n${tinggivsberat?.zScore} (${tinggivsberat?.category})`} />}
                    <Button loading={loading} disabled={!(!isEmpty(name) && !isEmpty(gender) && !isEmpty(age) && !isEmpty(weight) && !isEmpty(height))} onPress={handleSubmit}>
                        Submit
                    </Button>
                </Container>
            </ScrollView>
        </Container>
    );
}
 
export default Homepage;