import React from 'react';
import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'
import { Container,
    Content,
    Title,
    Message,
    Footer,
} from './styles';
import { StatusBar, useWindowDimensions } from 'react-native';
import { ConfirmButton } from '../../components/ConfirmButton';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button } from '../../components/Button';

export function ScheduleComplete() {
    const {width} = useWindowDimensions();
    const navigation = useNavigation();

    function handleBackHome() {
        navigation.navigate('Home')
    }

  return (
    <Container>
        <StatusBar barStyle='light-content' translucent backgroundColor='transparent'></StatusBar>
        <LogoSvg width={width}></LogoSvg>
        <Content>
            <DoneSvg width={80} height={80}></DoneSvg>
            <Title>Carro alugado!</Title>
            <Message>
                Agora você só precisa ir {'\n'}
                até a concessionária da RENTX {'\n'}
                pegar seu automóvel
            </Message>
        </Content>

        <Footer>
                <ConfirmButton title='OK' onPress={handleBackHome}/>
        </Footer>
        
    </Container>
  );
}