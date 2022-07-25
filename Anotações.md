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