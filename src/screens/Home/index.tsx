import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Container, Header, TotalCars, HeaderContent, CarList, MyCarsButton, MyCarsButtonContainer } from './styles';

import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';
import { useTheme } from 'styled-components';

import {Ionicons} from '@expo/vector-icons'

export function Home() {
  const [cars, setCars] =  useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

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
              <TotalCars>
                Total de 12 carros
              </TotalCars>
            </HeaderContent>
        </Header>

        {loading ? <Load></Load> : 
          <CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({item}) => 
                      <Car data={item} onPress={() => handleCarDetails(item)}></Car>
                       }
          />
        }
        <MyCarsButtonContainer>
          <MyCarsButton
            onPress={handleOpenMyCars}
          >
          <Ionicons
              name='ios-car-sport'
              size={32}
              color={theme.colors.shape}
          ></Ionicons>
          </MyCarsButton>
        </MyCarsButtonContainer>

    </Container>
  );


}