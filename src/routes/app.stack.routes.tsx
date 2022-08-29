import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Home } from '../screens/Home'
import { CarDetails } from '../screens/CarDetails'
import { Scheduling } from '../screens/Scheduling'
import { SchedulingDetails } from '../screens/SchedulingDetails'
import { Confirmation } from '../screens/Confirmation'
import { MyCars } from '../screens/MyCars'
import { SignIn } from '../screens/SignIn'
import { SingUpFirstStep } from '../screens/SingUp/SingUpFirstStep'
import { SignUpSecondStep } from '../screens/SingUp/SignUpSecondStep'

const {Navigator, Screen} = createNativeStackNavigator()

export function AppStackRoutes() {
    return (
        <Navigator screenOptions={{headerShown: false}} initialRouteName='Home' >
            <Screen name='Home' component={Home} options={{ title: '' }}></Screen>
            <Screen name='CarDetails' component={CarDetails}></Screen>
            <Screen name='Scheduling' component={Scheduling}></Screen>
            <Screen name='SchedulingDetails' component={SchedulingDetails}></Screen>
            <Screen name='Confirmation' component={Confirmation}></Screen>
            <Screen name='MyCars' component={MyCars}></Screen>
        </Navigator>
    )
}