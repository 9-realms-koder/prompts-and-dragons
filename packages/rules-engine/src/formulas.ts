import type { Attributes } from '@neonrealms/types';

/**
 * Calculate max HP based on vitality and level
 * Formula: 10 + (VIT * 3) + (Level * 2)
 */
export function calculateMaxHP(vitalidade: number, level: number): number {
  return 10 + vitalidade * 3 + level * 2;
}

/**
 * Calculate defense value
 * Formula: 10 + (AGI / 2) + Armor
 */
export function calculateDefense(agilidade: number, armor: number = 0): number {
  return 10 + Math.floor(agilidade / 2) + armor;
}

/**
 * Calculate initiative roll modifier (base only, without d10)
 */
export function calculateInitiative(agilidade: number): number {
  return agilidade;
}

/**
 * Calculate melee damage modifier
 * Formula: FOR / 2
 */
export function calculateMeleeDamageModifier(forca: number): number {
  return Math.floor(forca / 2);
}

/**
 * Calculate ranged damage modifier
 * Formula: AGI / 2
 */
export function calculateRangedDamageModifier(agilidade: number): number {
  return Math.floor(agilidade / 2);
}

/**
 * Calculate experience needed for next level
 * Formula: Level * 100
 */
export function calculateExpForLevel(level: number): number {
  return level * 100;
}

export interface DerivedStats {
  maxHP: number;
  defense: number;
  initiative: number;
  meleeDamageModifier: number;
  rangedDamageModifier: number;
  expForNextLevel: number;
}

/**
 * Calculate derived stats from attributes
 */
export function calculateDerivedStats(attributes: Attributes, level: number): DerivedStats {
  return {
    maxHP: calculateMaxHP(attributes.vitalidade, level),
    defense: calculateDefense(attributes.agilidade),
    initiative: calculateInitiative(attributes.agilidade),
    meleeDamageModifier: calculateMeleeDamageModifier(attributes.forca),
    rangedDamageModifier: calculateRangedDamageModifier(attributes.agilidade),
    expForNextLevel: calculateExpForLevel(level),
  };
}
