import React, { useState } from 'react';
import Container from '../../atomic/atoms/Container';
import Header from '../../atomic/molecules/Header';
import Button from '../../atomic/atoms/Button';
import { ScrollView } from 'react-native-gesture-handler';
import TextInput from '../../atomic/atoms/TextInput';
import {isEmpty} from 'lodash-es';
import { generateZScore, updateStateField } from '../../utils/script';
import InfoBox from '../../atomic/atoms/InfoBox';
import { infoColors } from '../../utils/themes';
import { getDataBerat } from '../../services/collections/BeratCollections';
import { getDataTinggi } from '../../services/collections/TinggiCollections';
import { getDataTinggiVsBerat } from '../../services/collections/TinggiVsBeratCollections';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Text from '../../atomic/atoms/Text';

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
    const navigation = useNavigation()
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
        <Container useEarlyReturn useSafeArea>
            <Header title='HOMEPAGE' />
            <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
                <Container>
                    <View style={styles.welcomeCard}>
                        <View style={styles.welcomeTextContainer}>
                            <Text color='#2E7D32' fontSize={22} fontWeight="700" style={{ marginBottom: 8 }}>
                                Hai! Selamat datang di Posyandu Ananda 👶
                            </Text>
                            <Text color='#4CAF50' fontSize={16} style={{ lineHeight: 22 }}>
                                Yuk mulai pantau tumbuh kembang si kecil dengan mudah!
                            </Text>
                        </View>
                        <View style={styles.actionButtons}>
                            <Button containerStyle={styles.editBtn} onPress={() => navigation.navigate('Editprofile')}>
                                Edit Profil
                            </Button>
                            <Button containerStyle={styles.logoutBtn} onPress={handleLogout} variant="outline" color="#e53935">
                                Logout
                            </Button>
                        </View>
                    </View>
                </Container>

                <Container usePaddingHorizontal style={{ marginTop: 20 }}>
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
                      placeholder='Masukan Berat Badan (kg)'
                      value={weight}
                      keyboardType='numeric'
                      onChangeText={(value) => updateStateField(setForm, 'weight', value)}
                    />
                    <TextInput
                      title='Tinggi Badan*'
                      placeholder='Masukan Tinggi Badan (cm)'
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

                    <Container style={{ gap: 12, marginTop: 24 }}>
                        {!isEmpty(berat) && (
                            <InfoBox
                            color={infoColors(berat?.category)}
                            title={`Z-Score Berat Badan :\n${berat?.zScore} (${berat?.category})`}
                            />
                        )}
                        {!isEmpty(tinggi) && (
                            <InfoBox
                            color={infoColors(tinggi?.category)}
                            title={`Z-Score Tinggi Badan :\n${tinggi?.zScore} (${tinggi?.category})`}
                            />
                        )}
                        {!isEmpty(tinggivsberat) && (
                            <InfoBox
                            color={infoColors(tinggivsberat?.category)}
                            title={`Z-Score Berat Badan Menurut Tinggi :\n${tinggivsberat?.zScore} (${tinggivsberat?.category})`}
                            />
                        )}
                    </Container>
                </Container>
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    welcomeCard: {
        backgroundColor: '#E8F5E9',  // hijau muda soft
        padding: 20,
        borderRadius: 12,
        marginHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#388E3C',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 4,
    },
    welcomeTextContainer: {
        flex: 1,
        paddingRight: 10,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    editBtn: {
        backgroundColor: '#4CAF50',
        width: 100,
        paddingVertical: 8,
        borderRadius: 8,
    },
    logoutBtn: {
        borderWidth: 1,
        borderColor: '#e53935',
        backgroundColor: 'red',
        width: 100,
        paddingVertical: 8,
        borderRadius: 8,
    },
    genderLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    genderOption: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        marginHorizontal: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    genderOptionActive: {
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
    },
    genderText: {
        color: '#666',
        fontWeight: '600',
    },
    genderTextActive: {
        color: '#fff',
        fontWeight: '700',
    }
});

export default Homepage;
