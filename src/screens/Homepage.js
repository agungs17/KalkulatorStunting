import React, { useState } from 'react';
import Container from '../atomic/atoms/Container';
import Header from '../atomic/molecules/Header';
import Button from '../atomic/atoms/Button';
import { ScrollView } from 'react-native-gesture-handler';
import TextInput from '../atomic/atoms/TextInput';

const Homepage = () => {
    const [form, setForm] = useState({})

    return (
        <Container useEarlyReturn useSafeArea>
            <Header title='Homepage'/>
            <ScrollView>
                <Container usePaddingHorizontal style={{ marginTop: 10 }}>
                    <TextInput/>
                    <Button>
                        Submit
                    </Button>
                </Container>
            </ScrollView>
        </Container>
    );
}
 
export default Homepage;