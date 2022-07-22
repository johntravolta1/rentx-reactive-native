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


