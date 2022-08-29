import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import * as Yup from 'yup'
import { Container,
Header,
Subtitle,
Title,
Footer,
Form,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import { database } from '../../database';
import { synchronize } from '@nozbe/watermelondb/sync';
import api from '../../services/api';


export function SignIn() {
    const {signIn} = useAuth()

    const theme = useTheme()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    async function handleSignIn() {
        try {            
            const schema = Yup.object().shape({
                password: Yup.string().required('A senha é obrigatória'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
            })
    
            await schema.validate({email, password})

            signIn({email, password})
        } 
        catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('Opa!', error.message)
            }
        }
    }

    function handleNewAccount() {
        navigation.navigate('SingUpFirstStep')
    }
    
    // useEffect(() => {
    //     async function offlineSynchronize() {
    //         await synchronize({
    //           database,
    //           pullChanges:async ({lastPulledAt}) => {
    //             const response= await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0 }`);
    //             const {latestVersion, changes }= response.data;
        
    //             return {changes, timestamp: latestVersion}
    //           },
    //           pushChanges:async ({changes}) => {
    //             const user = changes.users;
    //             if (user.updated.length > 0) {
    //               await api.post('/users/sync', user);
    //             }
    //           },
        
    //         });
    //       }
    //       offlineSynchronize()
    // }, [])

    useEffect(() => {
        async function loadData() {
            const userCollection = database.get('users')
            const carCollection = database.get('cars')
            const users = await userCollection.query().fetch()
            const cars = await carCollection.query().fetch()
            console.log('all users:' +JSON.stringify(users))
            console.log('all cars: ' + JSON.stringify(cars))
        }
        loadData();
    } , [])

  return (
    <KeyboardAvoidingView behavior='position' enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <StatusBar
                    barStyle='dark-content'
                    backgroundColor = 'transparent'
                    translucent
                ></StatusBar>
                <Header>
                    <Title>Estamos{'\n'}quase lá.</Title>
                    <Subtitle>Faça seu login para começar{'\n'}uma experiência incrível</Subtitle>
                </Header>
                <Form>  
                    <Input 
                        iconName='mail'
                        placeholder='E-mail'
                        keyboardType='email-address'
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={setEmail}
                        value={email}
                    ></Input>

                    <InputPassword
                        iconName='lock'
                        placeholder='Senha'
                        onChangeText={setPassword}
                        value={password}
                    ></InputPassword>
                </Form>
                <Footer>
                    <Button
                        title='Login'
                        onPress={handleSignIn}
                        enabled={true}
                        loading={false}
                    ></Button>
                    <Button
                        light
                        title='Criar conta gratuita'
                        color={theme.colors.background_secondary}
                        onPress={handleNewAccount}
                        enabled={true}
                        loading={false}
                    ></Button>
                </Footer>
            </Container>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}