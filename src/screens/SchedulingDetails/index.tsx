import React, { useEffect, useState } from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {Feather} from '@expo/vector-icons'

import { Container ,
Header,
CarImages,
Content,
Details,
Description,
Brand,
Name,
Rent,
Period,
Price,
Acessories,
Footer,
RentalPeriod,
CalendarIcon,
DateInfo,
DateTitle,
DateValue,
RentalPrice,
RentalPriceLabel,
RentalPriceDetails,
RentalPriceQuota,
RentalPriceTotal,
} from './styles';
import { Button } from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlataformDate';
import api from '../../services/api';
import { Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';


interface Params {
  car: CarDTO;
  dates: string[];
}  

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const netInfo = useNetInfo();
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const theme = useTheme()
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as Params;
  const rentTotal = Number(dates.length * car.price)

  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  async function handleConfirmRental() {
    setLoading(true)
    await api.post('rentals', {
      user_id: 2,
      car_id: car.id,
      start_date: new Date(dates[0]),
      end_date: new Date(dates[dates.length - 1]),
      total: rentTotal
    })
    .then(response => navigation.navigate('Confirmation', {
      title: 'Carro alugado!',
      message: 'Agora você só precisa ir \naté a concessionária RENTX',
      nextScreenRoute: 'Home',
    }))
    .catch(err => {
      console.log(err)
      Alert.alert('Erro ao gravar o novo agendamento do carro: ' + err)
      setLoading(false) //se der certo, vai pra próxima tela já, não precisa para o loading
    })
    .finally(() => {})
  }

  function handleBack() {
    navigation.goBack();
  }

  function pluralDiarias() {
    if (dates.length === 1) {
      return 'diária'
    } else {
      return 'diárias'
    }
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
    })
  }, [])

  useEffect(() => {
    async function fetchCarUpdate() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data)
    }

    if (netInfo.isConnected === true) {
      fetchCarUpdate()
    }
  },[netInfo.isConnected])

  return (
    <Container>
        <Header>
            <BackButton onPress={handleBack}></BackButton>
        </Header>
      <CarImages>
      <ImageSlider imagesUrl={
              !!carUpdated.photos ? carUpdated.photos : [{id: car.thumbnail, photo: car.thumbnail}]
            }/>
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R${car.price}</Price>
          </Rent>
          
        </Details>

        {
          carUpdated.accessories &&
          <Acessories>
            {
            carUpdated.accessories.map(a => (
              <Accessory 
                key={a.type}
                name={a.name} 
                icon={getAccessoryIcon(a.type)}
              />))
              }
          </Acessories>
        }

        <RentalPeriod>
          <CalendarIcon>
            <Feather name='calendar' size={RFValue(24)} color={theme.colors.shape}></Feather>
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather name='chevron-right' size={RFValue(10)} color={theme.colors.text}></Feather>

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>

        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$${car.price} x ${dates.length} ${pluralDiarias()}`}</RentalPriceQuota>
            <RentalPriceTotal>{`R$${rentTotal}`}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button title='Alugar agora' color={theme.colors.success} onPress={handleConfirmRental} enabled={!loading} loading={loading}></Button>
      </Footer>

    </Container>
  );
}