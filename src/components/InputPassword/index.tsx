import React, { useState } from 'react';
import {Feather} from '@expo/vector-icons'
import { Container,
  InputText,
  IconContainer,
  PasswordVisibilityButton,
  ButtonContainer,
} from './styles';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { BorderlessButton, BorderlessButtonProps, GestureHandlerRootView } from 'react-native-gesture-handler';
import { MyCarsButton } from '../MyCarsButton';
import { Button } from '../Button';

interface Props extends BorderlessButtonProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value: string;
}

export function InputPassword({iconName, onPress, value, ...rest} : Props) {
  const [isPasswordInvisible, setIsPasswordInvisible] = useState(true)
  const theme = useTheme()


  function handlePasswordVisibility() {
    setIsPasswordInvisible(prevState => !prevState)
  }
  
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!value)
  }

  return (
    <Container >
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
        ></Feather>
      </IconContainer>
      <InputText isFocused={isFocused} onFocus={handleInputFocus} onBlur={handleInputBlur} secureTextEntry={isPasswordInvisible} autoCorrect={false} {...rest}></InputText>

      <GestureHandlerRootView>
        <PasswordVisibilityButton onPress={handlePasswordVisibility}>
          <Feather
              name={isPasswordInvisible ? 'eye-off' : 'eye'}
              size={24}
              color={theme.colors.text_detail}
            ></Feather>
        </PasswordVisibilityButton>
      </GestureHandlerRootView>



    </Container>
  );
}