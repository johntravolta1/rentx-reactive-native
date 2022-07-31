import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';
import {AntDesign} from '@expo/vector-icons'

import { Container, Header, Title, SubTitle,
Content,
Apointments,
ApointmentsTitle,
ApointmentsQuantity,
CarWrapper,
CarFooter,
CarFooterTitle,
CarFooterPeriod,
CarFooterDate,
} from './styles';
import { Load } from '../../components/Load';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation()
  const theme = useTheme()
  
  function handleBack() {
    navigation.goBack();
  }


  useEffect(()=> {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=2');
        setCars(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()

  }, [])
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
            <SubTitle>
                Conforto, segurança e praticidade.
            </SubTitle>

      </Header>

      {loading ? <Load></Load> : 
        <Content>
          <Apointments>
            <ApointmentsTitle>Agendamentos realizados</ApointmentsTitle>
            <ApointmentsQuantity>{cars.length}</ApointmentsQuantity>
          </Apointments>

          <FlatList
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item})=> (
              <CarWrapper>
                <Car data={item.car}></Car>
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name='arrowright'
                      size={20}
                      color={theme.colors.title}
                      style={{marginHorizontal: 10}}
                    ></AntDesign>
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          ></FlatList>
        </Content>
      }
    </Container>
  );
}