import SpeedSvg from '../assets/speed.svg'
import AccelerationSvg from '../assets/acceleration.svg'
import ForceSvg from '../assets/force.svg'
import ExchangeSvg from '../assets/exchange.svg'
import PeopleSvg from '../assets/people.svg'
import GasolineSvg from '../assets/gasoline.svg'
import EnergySvg from '../assets/energy.svg'
import HybridSvg from '../assets/hybrid.svg'
import CarSvg from '../assets/car.svg'

export function getAccessoryIcon(type: string) {
    switch (type) {
        case 'speed':
            return SpeedSvg;
            break;
        case 'acceleration':
            return AccelerationSvg;
            break;
        case 'turning_diameter':
            return ForceSvg;
            break;
        case 'exchange':
            return ExchangeSvg;
            break;
        case 'seats':
            return PeopleSvg;
            break;
        case 'gasoline_motor':
            return GasolineSvg;
            break;
        case 'electric_motor':
            return EnergySvg;
            break;
        case 'hybrid_motor':
            return HybridSvg;
            break;
        default:
            return CarSvg;
            break;
    }
}