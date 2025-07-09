import React from 'react'
import Container from '../../atomic/atoms/Container';
import Header from '../../atomic/molecules/Header';

const Resep = () => {
    return ( 
        <Container useEarlyReturn useSafeArea>
            <Header useBack title='Resep'/>
            <Container  usePaddingHorizontal>
                
            </Container>
        </Container>
     );
}
 
export default Resep;