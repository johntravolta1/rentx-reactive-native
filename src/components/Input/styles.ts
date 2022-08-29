import { RFValue } from 'react-native-responsive-fontsize';
import styled, {css} from 'styled-components/native';

interface ContainerProps {
    isFocused: boolean;
}

export const Container = styled.View`
    flex-direction: row;

    margin-bottom: 8px;


`;

export const IconContainer = styled.View<ContainerProps>`
    height: 56px;
    width: 55px;
    justify-content: center;
    align-items: center;
    margin-right: 3px;
    background-color: ${({theme}) => theme.colors.background_secondary};
    
    ${({isFocused, theme}) => isFocused && css`
        border-bottom-width: 2px;
        border-bottom-color: ${theme.colors.main}
    `}
`

export const InputText = styled.TextInput<ContainerProps>`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background_secondary};
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.secondary_400};
    font-size: ${RFValue(15)}px;

    padding: 0 23px;

    ${({isFocused, theme}) => isFocused && css`
        border-bottom-width: 2px;
        border-bottom-color: ${theme.colors.main}
    `}
`;