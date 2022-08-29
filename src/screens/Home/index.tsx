import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Button, StatusBar, StyleSheet } from 'react-native';
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
import { useTheme } from 'styled-components';

import {Ionicons} from '@expo/vector-icons'
import Animated from 'react-native-reanimated';
import { LoadAnimation } from '../../components/LoadAnimation';

import NetInfo, { useNetInfo } from '@react-native-community/netinfo'
import {synchronize} from '@nozbe/watermelondb/sync'
import { database } from '../../database';
import {Car as ModelCar} from '../../database/models/Cars'

import SyncLogger from '@nozbe/watermelondb/sync/SyncLogger'

export function Home() {
  const [cars, setCars] =  useState<ModelCar[]>([]);
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

  const netInfo = useNetInfo()
  const navigation = useNavigation();
  const theme =useTheme()
  
  const logger = new SyncLogger(10)

  async function offlineSynchronize() {
    await synchronize({
      log: logger.newLog(),
      sendCreatedAsUpdated: false,
      database,
      pullChanges:async ({lastPulledAt}) => {        

        const response= await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0 }`);
        const {latestVersion, changes }= response.data;
        // require('@nozbe/watermelondb/sync/debugPrintChanges').default(changes, false)
        console.log('CHANGES:::')
        console.log(changes)
        const carCollection = database.get('cars')
        const userCollection = database.get('users')
        const cars = await carCollection.query().fetch();
        const users = await userCollection.query().fetch();
        console.log('=====DATABASE LOCAL:=======')
        var seen = [];
        console.log('all cars: '+ JSON.stringify(cars,function(key, val) {
          if (val != null && typeof val == "object") {
               if (seen.indexOf(val) >= 0) {
                   return;
               }
               seen.push(val);
           }
           return val;
       }))
        console.log('all users: ' + JSON.stringify(users,function(key, val) {
          if (val != null && typeof val == "object") {
               if (seen.indexOf(val) >= 0) {
                   return;
               }
               seen.push(val);
           }
           return val;
       }));


        return {changes, timestamp: latestVersion}
      },
      pushChanges:async ({changes}) => {
        console.log('pushChanges')
        console.log(changes)
        const user = changes.users;
        if (user.updated.length > 0) {
          await api.post('/users/sync', user)
        }
      },

    });
    console.log('==============LOGGER===============')
    console.log(logger.formattedLogs)
  }

  useEffect(() => {
    let isMounted = true;
    async function fetchCars()  {
      try {
        // const response = await api.get('/cars');
        const carCollection = database.get<ModelCar>('cars')
        const cars = await carCollection.query().fetch();
        // console.log(JSON.stringify(cars))
        isMounted && setCars(cars);
        console.log(cars)
        // isMounted && setCars(response.data);

      } catch (error) {
        console.log(error)
      }
      finally {
        isMounted && setLoading(false)
      }
    }
    
    fetchCars();
    return () => {
      isMounted = false;
    }
  }, [])

  useEffect(() => {
    if(netInfo.isConnected) {
      // Alert.alert('Você está online!')

      offlineSynchronize()
    } else {
    }
  }, [netInfo.isConnected])




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
        
        {/* <Button title='sincronizar' onPress={offlineSynchronize}></Button> */}

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