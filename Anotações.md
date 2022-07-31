## A importação default prescinde de chaves, pois é padrão:

>> No arquivo a ser importado:
    export default function Home() {
        return (
        );
    }

    export function f1() {
        return (
        );
    }

    export function f2() {
        return (
        );
    }

>> No arquivo de importação:
import  Home, {f1, f2} from './src/screens/Home';


## Bug do RectButton. 
O Button tava funcionando com a correção do GestureHandlerRootView e o ConfirmButton não. A única diferença entre os dois foi que o onPress era passado no props, no lugar do {...rest}. Quando coloquei o onPress sendo passado como Prop no ConfirmButton, voltou a funcionar:

interface Props {
    title: string;
    onPress: () => void;
}

export function ConfirmButton({title, onPress} : Props) {
  return (
    <GestureHandlerRootView>
      <Container onPress={onPress}>

=> Se tirarmos o onPress das propriedades, o ConfirmButton não funcionará!

## Outro bug do RectButton:
O position absolute e o clique não funciona. Para resolver, vi na documentação que o GestureHandlerRootView é uma view, e, sendo assim, envolvi o componente do botão por um container, e esse sim seria um GestureHandlerRootView no arquivo styles. Colocando o position absolute nele, aí sim funcionou:
"
        <MyCarsButtonContainer>
          <MyCarsButton
            onPress={handleOpenMyCars}
          > {...}
        </MyCarsButtonContainer>

export const MyCarsButtonContainer = styled(GestureHandlerRootView)`
  position:absolute;
  bottom: 13px;
  right: 22px;



## Comando pra começar o Json server:
yarn api