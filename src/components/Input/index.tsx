import React, { useState } from 'react';
import theme from '../../styles/theme';
import {Feather} from '@expo/vector-icons'
import { Container,
  InputText,
  IconContainer,
} from './styles';
import { Alert, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function Input({iconName, value, ...rest} : Props) {

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
      <InputText isFocused={isFocused}
        {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      ></InputText>

    </Container>
  );
}