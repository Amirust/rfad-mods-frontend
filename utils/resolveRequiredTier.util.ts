import type { BoostyTierEnum } from '~/types/boosty-tier.enum';
import { BoostyLevelList } from '~/locale/boosty.levels';

export default function (tier: BoostyTierEnum): string {
  return BoostyLevelList.find((level) => level.value === tier)?.label || 'Unknown';
}