import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Confirmation } from '../screens/Confirmation'
import { Splash } from '../screens/Splash'
import { SignIn } from '../screens/SignIn'
import { SingUpFirstStep } from '../screens/SingUp/SingUpFirstStep'
import { SignUpSecondStep } from '../screens/SingUp/SignUpSecondStep'

const {Navigator, Screen} = createNativeStackNavigator()

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{headerShown: false}} initialRouteName='Splash' >
            <Screen name='Splash' component={Splash} options={{ title: '' }}></Screen>
            <Screen name='SignIn' component={SignIn} options={{ title: '' }}></Screen>
            <Screen name='SingUpFirstStep' component={SingUpFirstStep} options={{ title: '' }}></Screen>
            <Screen name='SignUpSecondStep' component={SignUpSecondStep} options={{ title: '' }}></Screen>
            <Screen name='Confirmation' component={Confirmation}></Screen>
        </Navigator>
    )
}