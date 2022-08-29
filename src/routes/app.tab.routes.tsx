import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { MyCars } from '../screens/MyCars'
import { AppStackRoutes } from './app.stack.routes'

import HomeSvg from '../assets/home.svg'
import CarSvg from '../assets/car.svg'
import PeopleSvg from '../assets/people.svg'
import theme from '../styles/theme'
import { Platform } from 'react-native'
import { Profile } from '../screens/Profile'

const {Navigator, Screen} = createBottomTabNavigator()

export function AppTabRoutes() {
    return (
        <Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.colors.main,
                tabBarInactiveTintColor: theme.colors.text_detail,
                tabBarShowLabel: false,
                tabBarStyle: {
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 78,
                    backgroundColor: theme.colors.background_primary
                },
                headerShown: false,
            }}>
            <Screen name='Home' component={AppStackRoutes} 
                options={{
                    tabBarIcon: ({color}) => (
                        <HomeSvg width={24} height={24} fill={color}></HomeSvg>
                    )}}
            ></Screen>            
            <Screen name='MyCars' component={MyCars}
                options={{
                    tabBarIcon: ({color}) => (
                        <CarSvg width={24} height={24} fill={color}></CarSvg>
                    )}}
            ></Screen>
            <Screen name='Profile' component={Profile}
                options={{
                    tabBarIcon: ({color}) => (
                        <PeopleSvg width={24} height={24} fill={color}></PeopleSvg>
                    )}}
            ></Screen>
        </Navigator>
    )
}