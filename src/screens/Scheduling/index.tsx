import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';
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
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlataformDate';
import { CarDTO } from '../../dtos/CarDTO';

interface Params {
    car: CarDTO;
  }  

interface RentalPeriod {
    startFormated: string;
    endFormated: string;
}

export function Scheduling() {
    const route = useRoute();
    const { car } = route.params as Params;
        const theme = useTheme()
        const navigation = useNavigation();

    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
    const [rentalPeriod, setRentalPeriod] =useState<RentalPeriod>({} as RentalPeriod)

    function handleConfirmRental() {
            navigation.navigate('SchedulingDetails',{
                car,
                dates: Object.keys(markedDates)
            }
            )
    }

    function handleBack() {
        navigation.goBack();
      }

      function handleChangeData(date:DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if(start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setLastSelectedDate(end)
        const interval = generateInterval(start, end);
        setMarkedDates(interval)

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1]

        setRentalPeriod({
            startFormated: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormated: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
        })
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
                onPress={handleBack}
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
                    <DateValue selected={!!rentalPeriod.startFormated}>{rentalPeriod.startFormated}</DateValue>
                </DateInfo>
                <ArrowSvg></ArrowSvg>

                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    <DateValue selected={!!rentalPeriod.endFormated}>{rentalPeriod.endFormated}</DateValue>
                </DateInfo>
            </RentalPeriod>

        </Header>

        <Content>
            <Calendar
                markedDates={markedDates}
                onDayPress={handleChangeData}
            ></Calendar>
        </Content>

        <Footer>
            <Button title='Confirmar' onPress={handleConfirmRental} enabled={!!rentalPeriod.startFormated}></Button>
        </Footer>
    </Container>
  );
}