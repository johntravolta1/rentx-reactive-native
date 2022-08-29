import React from 'react';
import { SvgProps } from 'react-native-svg';
import theme from '../../styles/theme';

import { Container, Name } from './styles';

interface Props {
    name: string;
    icon: React.FC<SvgProps>
}

export function Accessory({name, icon: Icon} : Props) {
  return (
    <Container>
        <Icon width={32} height={32} fill={theme.colors.header}></Icon>
        <Name>{name}</Name>
    </Container>
  );
}