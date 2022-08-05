import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Home } from '../screens/Home'
import { CarDetails } from '../screens/CarDetails'
import { Scheduling } from '../screens/Scheduling'
import { SchedulingDetails } from '../screens/SchedulingDetails'
import { ScheduleComplete } from '../screens/ScheduleComplete'
import { MyCars } from '../screens/MyCars'
import { Splash } from '../screens/Splash'

const {Navigator, Screen} = createNativeStackNavigator()

export function StackRoutes() {
    return (
        <Navigator screenOptions={{headerShown: false}} >
            <Screen name='Splash' component={Splash} options={{ title: '' }}></Screen>
            <Screen name='Home' component={Home} options={{ title: '',gestureEnabled: false }}></Screen>
            <Screen name='CarDetails' component={CarDetails}></Screen>
            <Screen name='Scheduling' component={Scheduling}></Screen>
            <Screen name='SchedulingDetails' component={SchedulingDetails}></Screen>
            <Screen name='ScheduleComplete' component={ScheduleComplete}></Screen>
            <Screen name='MyCars' component={MyCars}></Screen>
        </Navigator>
    )
}