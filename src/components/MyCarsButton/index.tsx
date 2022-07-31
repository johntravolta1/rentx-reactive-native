import React from 'react';
import { GestureHandlerRootView, RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title, } from './styles';
import { useTheme } from 'styled-components';
interface Props extends RectButtonProps {
    title: string;
    onPress: () => void;
}

export function MyCarsButton({title,onPress, ...rest} : Props) {
    
  return (
    <GestureHandlerRootView {...rest}>
      <Container onPress={onPress} >
      </Container>


    </GestureHandlerRootView>
  );
}