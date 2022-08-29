import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import {Car as ModelCar} from '../../database/models/cars'
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
import { LoadAnimation } from '../../components/LoadAnimation';
import { format, parseISO } from 'date-fns';

interface DataProps {
  id: string;
  car: ModelCar;
  start_date:string;
  end_date:string;
}

export function MyCars() {
  const [cars, setCars] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(true);
  const screenIsFocus = useIsFocused()

  const navigation = useNavigation()
  const theme = useTheme()
  
  function handleBack() {
    navigation.goBack();
  }


  useEffect(()=> {
    async function fetchCars() {
      try {
        const response = await api.get('/rentals');
        const dataFormated = response.data.map((data: DataProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), 'dd/MM/yyy'),
            end_date: format(parseISO(data.end_date), 'dd/MM/yyy'),
          }
        })
        setCars(dataFormated)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    fetchCars()

  }, [screenIsFocus])
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

      {loading ? <LoadAnimation/> : 
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
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name='arrowright'
                      size={20}
                      color={theme.colors.title}
                      style={{marginHorizontal: 10}}
                    ></AntDesign>
                    <CarFooterDate>{item.end_date}</CarFooterDate>
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