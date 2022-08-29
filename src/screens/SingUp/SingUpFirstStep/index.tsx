import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';
import * as Yup from 'yup'

export function SingUpFirstStep() {


  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [driverLicense,setDriverLicense] = useState('')

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack()  
  }
  
  async function handleNextStep() {

    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatório'),
        email: Yup.string().email('Email inválido').required('E-mail é obrigatório'),
        name: Yup.string().required('Nome é obrigatório'),
      });

      const data = {name, email, driverLicense};
      await schema.validate(data);

      navigation.navigate('SignUpSecondStep', {user: data})

    } catch (error) {
      if (error  instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message)
      }
    }
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
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName='user'
              placeholder='Nome'
              onChangeText={setName}
              value={name}
            ></Input>
              
            <Input
              iconName='mail'
              placeholder='E-mail'
              onChangeText={setEmail}
              value={email}
            ></Input>
              
            <Input
              iconName='credit-card'
              placeholder='CNH'
              onChangeText={setDriverLicense}
              value={driverLicense}
            ></Input>
              
          </Form>

          <Button
            title='Próximo'
            onPress={handleNextStep}
          ></Button>
        </Container>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}