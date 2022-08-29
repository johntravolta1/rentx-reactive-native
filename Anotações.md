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




## Erro do yarn run android: com o nozbe/watermelon-db:
próxima tentativa: instalar a versão do watermelon utilizada pelo Rodrigo.
=> o erro estava em outro arquivo que eu tinha mexido a pedido do rodrigo. Removi o nozbe e rodei yarn run android pra achar o defeito. Depois de resolvido o defeito (tinha um método duplicado), a sugestão da internet resolveu o problema com o nozbe/watermelon-db, que foi adicionar a versão do kotling manualmente no arquivo android/build.gradle:

        kotlin_version = '1.5.20' 
        kotlinVersion = '1.5.20'



## Erro no yarn run android com o imagepicker:
Rodei o yarn start antes de rodar o yarn run android, e ele me disse mais claramente qual a versão do imagepicker tinha que instalar:
```css
Some dependencies are incompatible with the installed expo package version:
 - expo-image-picker - expected version: ~13.1.1 - actual version installed: 13.3.1
```
Depois de instalada a versão 13.1.1 do expo-image-picker, compilou


## Error: UNIQUE constraint failed: cars.id (code 1555 SQLITE_CONSTRAINT_PRIMARYKEY)
O carro Chevrolet Corvette Z06 ("id": "52930821-cbea-4b05-9f45-7c02b1bb0d8c") estava com updated_at <> created_at. Provavelmente porque o arquivo de onde eu peguei a base de dados já estava modificado por algum outro usuário, acho que não peguei o arquivo do repositório da rocket-seat. Com isso, como o carro ainda não tinha sido criado na minha base de dados, dava o erro pois o nozbe-watermellon é muito burro nesse sentido.
Ele não atualiza um carro que ainda não foi criado, e joga um erro.
O que eu fiz foi atualizar na base pra deixar created_at = updated_at. Assim ele vai criar o registro, e, se for atualizado na base, como já vai estar criado na base local do nozbe watermelon, não vai ter problema e o código do Rodrigo vai funcionar.

=> voltar para o início da aula 'Sincronizando usuário'
=> fazer tudo que ele faz pra deixar o código igual
=> na hora que ele for sincronizar, mexer na base pra deixar created_at = updated_at


## Erro da tela de confirmação de cadastro:
debugar com o flipper e ver os elementos.

=>não sei por que não queria aparecer junto com a Logo. Joguei a logo pra dentro do Content. 
Antes:
        <LogoSvg width={width}/>
        <Content>
            ..
        </Content>

Depois:
        <Content>
            <LogoSvg width={width}/>
            ..
        </Content>