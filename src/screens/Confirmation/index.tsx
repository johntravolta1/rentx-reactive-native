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
import { useNavigation, useRoute } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button } from '../../components/Button';

interface Params {
    title: string;
    message: string;
    nextScreenRoute: string;
}

export function Confirmation() {
    const {width} = useWindowDimensions();
    const navigation = useNavigation();

    const route = useRoute();
    const {title, message, nextScreenRoute} = route.params as Params
    function handleBackHome() {
        navigation.navigate(nextScreenRoute)
    }

  return (
    <Container>
        <StatusBar barStyle='light-content' translucent backgroundColor='transparent'></StatusBar>
        <Content>
            <LogoSvg width={width}/>
            <DoneSvg width={80} height={80}></DoneSvg>
            <Title>{title}</Title>
            <Message>
                {message}
            </Message>
        </Content>

        <Footer>
                <ConfirmButton title='OK' onPress={handleBackHome}/>
        </Footer>
        
    </Container>
  );
}