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
import { useNavigation } from '@react-navigation/native';

export function CarDetails() {
  const navigation = useNavigation();

  function handleConfirmeRental() {
    navigation.navigate('Scheduling')
  }

  return (
    <Container>
        <Header>
            <BackButton onPress={() => {}}></BackButton>
        </Header>
      <CarImages>
        <ImageSlider imagesUrl={['data:image/jpeg;base64,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3STeE8mOLnuEnZYx6Xl1jh+K5/mf6zVvKDGviK713BLsFzHU3IAUHwA8J1HZ3kwGsEpZ+vL8zNmwHkQ2hYInYATIr56pYWoSCqOexWPwE2zyd2Nia706JpOKYa7syFSqPbpFUnX0gLae7Wd6wfktQTUgufzbvASYo0FQWVQo6gBKjzDtdR6OXTQcuqX4iAiIgIiICIiAiIgW6lSwvYmc/wDL7GCtRbD1ML0iXuGbMCjDcykWIO/juJB0M6JKGQHeAe0QPlTEeTzAnK2nAHhMVth1Byn1TX2Ph39aijdqiR9XyQwTb6CjsLD4GB8zU9mupvvPCXWpvxvPop/ILAn8Nh2O3zmM/m6wR3dIP5h8xKj58KNyMpKGd/fzZYQ/eqDvT+mWT5rsL+8q/wCj+mBwTKYyTvB81eG/e1PBPpKf/SnDfvangn0g04TknmWd3/8ASfC/vangn0no81GE41Kv/wCf9MGnCMsx8UmgPKfQi+avA8Wqn+Zf6ZdHmu2fxR27X+gED5sDTJw9XgTbiD1z6Op+bDZY1+zX7alT+qSNDyG2au7B0T/Egb/feRXz7QeriX6NFXM+UVHUG+UBQM2tlUBF9EWvlE6XsryWeyqlI2AAuRbvJM6hhcBSpjLTppTHJFVR4ATKgaXgvI5tC7hepRc+Jk7hPJ+hTtZMx5trJaIFKIBoAAOqVxEBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERA//9k=']}/>
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$580,00</Price>
          </Rent>
          
        </Details>

        <Acessories>
          <Accessory name='380km/h' icon={SpeedSvg}></Accessory>
          <Accessory name='3.2s' icon={AccelerationSvg}></Accessory>
          <Accessory name='800 HP' icon={ForceSvg}></Accessory>
          <Accessory name='Gasolina' icon={GasolineSvg}></Accessory>
          <Accessory name='Auto' icon={ExchangeSvg}></Accessory>
          <Accessory name='2 pessoas' icon={PeopleSvg}></Accessory>
        </Acessories>

        <About>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem dolorem corrupti unde architecto, velit labore esse! Aperiam incidunt, ex, non minus, quis dolore laboriosam placeat sequi ea ut temporibus a!
        </About>

      </Content>

      <Footer>
        <Button title='Escolher período do aluguel' onPress={handleConfirmeRental}></Button>
      </Footer>

    </Container>
  );
}