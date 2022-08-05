import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import Animated
, { Extrapolate,
interpolate,
useAnimatedScrollHandler,
  useAnimatedStyle,
useSharedValue } from 'react-native-reanimated';
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
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StatusBar } from 'react-native';

interface Params {
  car: CarDTO;
}


export function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();

  const { car } = route.params as Params;
  
  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0,200],
        [200,70],
        Extrapolate.CLAMP
      )
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0,150],
        [1, 0]
      )
    }
  })

  function handleConfirmeRental() {
    navigation.navigate('Scheduling', {car})
  }

  function handleBack() {
    navigation.goBack();
  }



  return (
    <Container>
        <StatusBar
          barStyle='dark-content'
          translucent
          backgroundColor = 'transparent'
        ></StatusBar>

        <Animated.View
          style={[headerStyleAnimation, sliderCarsStyleAnimation]}
        >
          <Header>
              <BackButton onPress={handleBack}></BackButton>
          </Header>
          <CarImages>
            <ImageSlider imagesUrl={car.photos}/>
          </CarImages>
        </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight()
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
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

        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>

      </Animated.ScrollView>

      <Footer>
        <Button title='Escolher período do aluguel' onPress={handleConfirmeRental}></Button>
      </Footer>

    </Container>
  );
}