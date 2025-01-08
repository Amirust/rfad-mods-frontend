import type { CreateMod, Mod } from '~/types/api/mods.types';
import type { BoostyTierEnum } from '~/types/boosty-tier.enum';

export interface FindResult {
  totalPages: number;
  mods: BoostyMod[]
}

export interface BoostyMod extends CreateBoostyMod, Mod {
  accessible: boolean
}

export interface CreateBoostyMod extends CreateMod {
  requiredTier: BoostyTierEnum
}