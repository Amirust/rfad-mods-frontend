
import { BoostyTierEnum } from '~/types/boosty-tier.enum';

export interface BoostyLevel {
  value: BoostyTierEnum;
  label: string;
}

export const BoostyLevelList = [
  {
    value: BoostyTierEnum.Nobility,
    label: 'Знать'
  },
  {
    value: BoostyTierEnum.Boyar,
    label: 'Боярин'
  },
  {
    value: BoostyTierEnum.Philanthropist,
    label: 'Филантроп'
  },
  {
    value: BoostyTierEnum.Patron,
    label: 'Покровитель'
  },
  {
    value: BoostyTierEnum.Legend,
    label: 'Легенда'
  }
] as BoostyLevel[];