import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import SpeedSvg from '../../assets/speed.svg'
import AccelerationSvg from '../../assets/acceleration.svg'
import ForceSvg from '../../assets/force.svg'
import GasolineSvg from '../../assets/gasoline.svg'
import ExchangeSvg from '../../assets/exchange.svg'
import PeopleSvg from '../../assets/people.svg'

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
About,
Acessories,
Footer,
} from './styles';
import { Button } from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface Params {
  car: CarDTO;
}


export function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();

  const { car } = route.params as Params;

  function handleConfirmeRental() {
    navigation.navigate('Scheduling', {car})
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
        <Header>
            <BackButton onPress={handleBack}></BackButton>
        </Header>
      <CarImages>
        <ImageSlider imagesUrl={car.photos}/>
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{`R$${car.rent.price}`}</Price>
          </Rent>
          
        </Details>

        <Acessories>
          {
          car.accessories.map(a => (
            <Accessory 
              key={a.type}
              name={a.name} 
              icon={getAccessoryIcon(a.type)}
            />))
            }
        </Acessories>

        <About>{car.about}</About>

      </Content>

      <Footer>
        <Button title='Escolher período do aluguel' onPress={handleConfirmeRental}></Button>
      </Footer>

    </Container>
  );
}