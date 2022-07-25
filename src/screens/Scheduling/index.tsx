import React from 'react';
import { useTheme } from 'styled-components';
import { StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';
import theme from '../../styles/theme';
import ArrowSvg from '../../assets/arrow.svg';

import { Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,
} from './styles';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';
import { useNavigation } from '@react-navigation/native';

export function Scheduling() {
    const theme = useTheme()
    const navigation = useNavigation();

    function handleConfirmRental() {
        navigation.navigate('SchedulingDetails')
    }

  return (
    <Container>
        <Header>
            <StatusBar
                barStyle='light-content'
                translucent
                backgroundColor='transparent'
            ></StatusBar>
            <BackButton 
                onPress={() => {}}
                color={theme.colors.shape}
            ></BackButton>
            <Title>
                Escolha uma {'\n'}
                data de início e  {'\n'}
                fim do aluguel
            </Title>
            
            <RentalPeriod>
                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue selected={false}>18/06/2022</DateValue>
                </DateInfo>
                <ArrowSvg></ArrowSvg>

                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    <DateValue selected={false}>18/06/2022</DateValue>
                </DateInfo>
            </RentalPeriod>

        </Header>

        <Content>
            <Calendar></Calendar>
        </Content>

        <Footer>
            <Button title='Confirmar' onPress={handleConfirmRental}></Button>
        </Footer>
    </Container>
  );
}