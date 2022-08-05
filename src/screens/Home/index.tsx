import React, { useEffect, useState } from 'react';
import { BackHandler, StatusBar, StyleSheet } from 'react-native';
import { Container, Header, TotalCars, HeaderContent, CarList, MyCarsButton, MyCarsButtonContainer,AnimatedMyCarsButtonContainer } from './styles';

import { RectButton, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Aniamted ,{ useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated'

const ButtonAnimated = Aniamted.createAnimatedComponent(RectButton)

import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';
import { useTheme } from 'styled-components';

import {Ionicons} from '@expo/vector-icons'
import Animated from 'react-native-reanimated';
import { LoadAnimation } from '../../components/LoadAnimation';

export function Home() {
  const [cars, setCars] =  useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const positionY = useSharedValue(0)
  const positionX = useSharedValue(0)

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: positionX.value},
        {translateY: positionY.value}
      ]
    }
  })

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart(_, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value= ctx.positionX+event.translationX; 
      positionY.value = ctx.positionY+event.translationY;
    },
    onEnd(){
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  })

  const navigation = useNavigation();
  const theme =useTheme()

  useEffect(() => {
    async function fetchCars()  {
      try {
        const response = await api.get('/cars');
        setCars(response.data);

      } catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false)
      }
    }
    
    fetchCars();
  }, [])

  useEffect(()=> {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    })
  }, []);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', {car})
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars')
  }

  return (
    <Container>
      <StatusBar 
        barStyle='light-content' 
        backgroundColor='transparent' 
        translucent
      />
        <Header>
          <HeaderContent>
              <Logo 
                width={RFValue(108)}
                height={RFValue(12)}
              />
              {
                !loading &&
                <TotalCars>
                  Total de {cars.length} carros
                </TotalCars>
              }
            </HeaderContent>
        </Header>

        {loading ? <LoadAnimation></LoadAnimation> : 
          <CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({item}) => 
                      <Car data={item} onPress={() => handleCarDetails(item)}></Car>
                       }
          />
        }

        {/* <MyCarsButtonContainer>
          <MyCarsButton
            onPress={handleOpenMyCars}
          >
            <Ionicons
            name='ios-car-sport'
            size={32}
            color={theme.colors.shape}
            ></Ionicons>
          </MyCarsButton> 
        </MyCarsButtonContainer> */}

      
        <AnimatedMyCarsButtonContainer>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View 
            style={
              myCarsButtonStyle}
          >
              <ButtonAnimated
                onPress={handleOpenMyCars}
                style={[styles.button, {backgroundColor: theme.colors.main}]}
              >
                  <Ionicons
                      name='ios-car-sport'
                      size={32}
                      color={theme.colors.shape}
                  ></Ionicons>
              </ButtonAnimated>
            </Animated.View>
            </PanGestureHandler>
          </AnimatedMyCarsButtonContainer>
      
    </Container>
  );


}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})