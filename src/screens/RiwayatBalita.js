import React from 'react'
import Container from '../atomic/atoms/Container';
import Header from '../atomic/molecules/Header';

const RiwayatBalita = () => {
    return ( 
        <Container useEarlyReturn useSafeArea>
            <Header useBack title='Riwayat Balita' noShadow/>
        </Container>
     );
}
 
export default RiwayatBalita;