import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { InputPassword } from '../../../components/InputPassword';
import api from '../../../services/api';
import theme from '../../../styles/theme';
import { Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}


export function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigation = useNavigation();
  const route = useRoute();

  const { user} = route.params as Params

  function handleBack() {
    navigation.goBack()  
  }

  async function handleRegister() {
    if(!password || !passwordConfirm) 
      return Alert.alert('Informe a senha e a confirmação!')

    if (password != passwordConfirm)
      return Alert.alert('As senhas não conferem')

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password,
    })
    .then(() => {
      navigation.navigate('Confirmation', {
        nextScreenRoute: 'SignIn',
        title: 'Conta criada!',
        message: 'Agora é só fazer login\n e aproveitar'
      })
    })
    .catch((err) => {
      Alert.alert('Opa', 'Erro ao cadastrar usuário: ' + err)
    })
  }
  
  return (
    <KeyboardAvoidingView behavior='position' enabled>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack}></BackButton>
            <Steps>
              <Bullet active></Bullet>
              <Bullet></Bullet>
            </Steps>
          </Header>

          <Title>Crie sua {`\n`}conta</Title>
          <SubTitle>Faça seu cadastro de {`\n`}forma rápido e fácil</SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <InputPassword
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            ></InputPassword>
            <InputPassword
              iconName='lock'
              placeholder='Repetir senha'
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            ></InputPassword>
              
          </Form>

          <Button
            title='Cadastrar'
            color={theme.colors.success}
            onPress={handleRegister}
          ></Button>
        </Container>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}