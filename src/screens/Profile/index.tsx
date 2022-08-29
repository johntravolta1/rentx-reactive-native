import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { BackButton } from '../../components/BackButton';
import theme from '../../styles/theme';
import { Container,
    Photo,
    PhotoContainer,
    LogoutButton,
    HeaderTitle,
    HeaderTop,
    Header,
    PhotoButton,
    Content,
    Options,
    Option,
    OptionTitle,
    Section,
} from './styles';
import { Feather} from '@expo/vector-icons'
import { Input } from '../../components/Input';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { InputPassword } from '../../components/InputPassword';
import { useAuth } from '../../hooks/auth';
import * as ImagePicker from 'expo-image-picker'
import { Button } from '../../components/Button';
import * as Yup from 'yup'
import { useNetInfo } from '@react-native-community/netinfo';
export function Profile() {
    const {user, signOut, updateUser} = useAuth()
  const netInfo = useNetInfo()
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
  const [ avatar, setAvatar] = useState(user.avatar)
  const [name, setName] = useState(user.name)
  const [driverLicense, setDriverLicense] = useState(user.driver_license);


  const navigation = useNavigation()
  function handleBack() {
    navigation.goBack()
  }  

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    if(!netInfo.isConnected === true && optionSelected === 'passwordEdit') {
        Alert.alert('Você está offline', 'Conecte-se a Internet para realizar a troca de senha!')
        return
    }
    setOption(optionSelected)
  }

  async function handleSelectAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,4],
        quality: 1,
    })

    if (result.cancelled) {
        return;
    }

    if (result.uri) {
        setAvatar(result.uri)
    }
}

async function handleProfileUpdate() {
    try {
        const schema = Yup.object().shape({
            driverLicense: Yup.string().required('CNH é obrigatória'),
            name: Yup.string().required('Nome é obrigatório')
        })

        const data = {name, driverLicense}
        await schema.validate(data)

        await updateUser({
            id: user.id,
            user_id: user.user_id,
            email: user.email,
            name,
            driver_license: driverLicense,
            avatar,
            token: user.token
        })

        Alert.alert('Perfil atualizado!')

    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            Alert.alert('Opa', error.message)
        } else {
            Alert.alert('Não foi possível atualiar o perfil')
            console.log(error)
        }
    }
}

async function handleSignOut() {
    Alert.alert('Tem certeza?', 'Se você sair, irá precisar de internet para conectar-se novamente', 
    [
        {
            text: 'Cancelar',
            onPress: () => {},
        },
        {
            text: 'Sair',
            onPress: () => signOut()
        }
    ])
}
  return (
    <KeyboardAvoidingView behavior='position' enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <HeaderTop>
                        <BackButton
                            color = {theme.colors.shape} onPress={handleBack}
                        ></BackButton>
                        <HeaderTitle>Editar Perfil</HeaderTitle>
                        <LogoutButton onPress={handleSignOut}>
                            <Feather name='power' size={24} color={theme.colors.shape}></Feather>
                        </LogoutButton>
                    </HeaderTop>
                    <PhotoContainer>
                            {/* <Photo source={{uri: 'https://i.pinimg.com/564x/9b/0d/a2/9b0da29b8cf529c80f503064699b255d.jpg'}}></Photo> */}
                            {!!avatar && <Photo source={{uri: avatar}}></Photo>}
                            <PhotoButton onPress={handleSelectAvatar}>
                                <Feather
                                    name='camera'
                                    size={24}
                                    color={theme.colors.shape}
                                ></Feather>
                            </PhotoButton>
                    </PhotoContainer>
                </Header>

                <Content style={{marginBottom: useBottomTabBarHeight()}}>
                    <Options>
                        <Option active={option === 'dataEdit'} onPress={()=>handleOptionChange('dataEdit')}>
                            <OptionTitle active={option === 'dataEdit'}>
                                Dados
                            </OptionTitle>
                        </Option>
                        <Option active={option === 'passwordEdit'} onPress={()=>handleOptionChange('passwordEdit')}>
                            <OptionTitle active={option === 'passwordEdit'}>
                                Trocar senha
                            </OptionTitle>
                        </Option>
                    </Options>
                {option === 'dataEdit' ?
                    <Section>
                        <Input
                            iconName='user'
                            placeholder='Nome'
                            autoCorrect={false}
                            defaultValue={user.name}
                            onChangeText={setName}
                        ></Input>
                        <Input
                            iconName='mail'
                            editable={false}
                            autoCorrect={false}
                            defaultValue={user.email}
                        ></Input>
                        <Input
                            iconName='credit-card'
                            placeholder='CNH'
                            keyboardType='numeric'
                            defaultValue={user.driver_license}
                            onChangeText={setDriverLicense}
                        ></Input>
                    </Section>
                :
                    <Section>
                        <InputPassword
                            iconName='lock'
                            placeholder='Senha atual'
                        ></InputPassword>
                        <InputPassword
                            iconName='lock'
                            placeholder='Nova senha'
                        ></InputPassword>
                        <InputPassword
                            iconName='lock'
                            placeholder='Repetir senha'
                        ></InputPassword>
                    </Section>
                }
                    <Button
                        title='Salvar alterações'
                        onPress={handleProfileUpdate}
                    ></Button>

                </Content>

            </Container>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}