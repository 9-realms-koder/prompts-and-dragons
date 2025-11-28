import { describe, it, expect } from 'vitest';
import {
  calculateMaxHP,
  calculateDefense,
  calculateInitiative,
  calculateMeleeDamageModifier,
  calculateRangedDamageModifier,
  calculateExpForLevel,
  calculateDerivedStats,
} from './formulas';
import type { Attributes } from '@neonrealms/types';

describe('calculateMaxHP', () => {
  it('should calculate HP correctly at level 1 with 10 vitality', () => {
    // Formula: 10 + (VIT * 3) + (Level * 2)
    // 10 + (10 * 3) + (1 * 2) = 10 + 30 + 2 = 42
    expect(calculateMaxHP(10, 1)).toBe(42);
  });

  it('should calculate HP correctly at level 5 with 15 vitality', () => {
    // 10 + (15 * 3) + (5 * 2) = 10 + 45 + 10 = 65
    expect(calculateMaxHP(15, 5)).toBe(65);
  });

  it('should handle level 1 with minimum vitality', () => {
    // 10 + (1 * 3) + (1 * 2) = 10 + 3 + 2 = 15
    expect(calculateMaxHP(1, 1)).toBe(15);
  });

  it('should handle high level characters', () => {
    // 10 + (20 * 3) + (20 * 2) = 10 + 60 + 40 = 110
    expect(calculateMaxHP(20, 20)).toBe(110);
  });

  it('should handle zero vitality', () => {
    // 10 + (0 * 3) + (1 * 2) = 10 + 0 + 2 = 12
    expect(calculateMaxHP(0, 1)).toBe(12);
  });
});

describe('calculateDefense', () => {
  it('should calculate defense without armor', () => {
    // Formula: 10 + (AGI / 2) + Armor
    // 10 + floor(10 / 2) + 0 = 10 + 5 + 0 = 15
    expect(calculateDefense(10)).toBe(15);
  });

  it('should calculate defense with armor', () => {
    // 10 + floor(10 / 2) + 5 = 10 + 5 + 5 = 20
    expect(calculateDefense(10, 5)).toBe(20);
  });

  it('should floor the agility division', () => {
    // 10 + floor(11 / 2) + 0 = 10 + 5 + 0 = 15
    expect(calculateDefense(11)).toBe(15);
    // 10 + floor(13 / 2) + 0 = 10 + 6 + 0 = 16
    expect(calculateDefense(13)).toBe(16);
  });

  it('should handle zero agility', () => {
    // 10 + floor(0 / 2) + 0 = 10 + 0 + 0 = 10
    expect(calculateDefense(0)).toBe(10);
  });

  it('should handle high armor values', () => {
    // 10 + floor(20 / 2) + 15 = 10 + 10 + 15 = 35
    expect(calculateDefense(20, 15)).toBe(35);
  });
});

describe('calculateInitiative', () => {
  it('should return agility value directly', () => {
    expect(calculateInitiative(10)).toBe(10);
    expect(calculateInitiative(15)).toBe(15);
    expect(calculateInitiative(5)).toBe(5);
  });

  it('should handle zero agility', () => {
    expect(calculateInitiative(0)).toBe(0);
  });

  it('should handle high agility', () => {
    expect(calculateInitiative(25)).toBe(25);
  });
});

describe('calculateMeleeDamageModifier', () => {
  it('should calculate melee modifier correctly', () => {
    // Formula: FOR / 2 (floored)
    expect(calculateMeleeDamageModifier(10)).toBe(5);
    expect(calculateMeleeDamageModifier(15)).toBe(7);
  });

  it('should floor the result', () => {
    expect(calculateMeleeDamageModifier(11)).toBe(5);
    expect(calculateMeleeDamageModifier(13)).toBe(6);
  });

  it('should handle zero strength', () => {
    expect(calculateMeleeDamageModifier(0)).toBe(0);
  });

  it('should handle low strength', () => {
    expect(calculateMeleeDamageModifier(1)).toBe(0);
    expect(calculateMeleeDamageModifier(2)).toBe(1);
  });
});

describe('calculateRangedDamageModifier', () => {
  it('should calculate ranged modifier correctly', () => {
    // Formula: AGI / 2 (floored)
    expect(calculateRangedDamageModifier(10)).toBe(5);
    expect(calculateRangedDamageModifier(14)).toBe(7);
  });

  it('should floor the result', () => {
    expect(calculateRangedDamageModifier(11)).toBe(5);
    expect(calculateRangedDamageModifier(13)).toBe(6);
  });

  it('should handle zero agility', () => {
    expect(calculateRangedDamageModifier(0)).toBe(0);
  });
});

describe('calculateExpForLevel', () => {
  it('should calculate EXP needed for each level', () => {
    // Formula: Level * 100
    expect(calculateExpForLevel(1)).toBe(100);
    expect(calculateExpForLevel(2)).toBe(200);
    expect(calculateExpForLevel(5)).toBe(500);
    expect(calculateExpForLevel(10)).toBe(1000);
  });

  it('should handle high levels', () => {
    expect(calculateExpForLevel(20)).toBe(2000);
    expect(calculateExpForLevel(100)).toBe(10000);
  });
});

describe('calculateDerivedStats', () => {
  const testAttributes: Attributes = {
    forca: 12,
    agilidade: 14,
    intelecto: 10,
    carisma: 8,
    hack: 16,
    vitalidade: 10,
  };

  it('should calculate all derived stats correctly', () => {
    const stats = calculateDerivedStats(testAttributes, 3);

    // maxHP: 10 + (10 * 3) + (3 * 2) = 10 + 30 + 6 = 46
    expect(stats.maxHP).toBe(46);

    // defense: 10 + floor(14 / 2) + 0 = 10 + 7 = 17
    expect(stats.defense).toBe(17);

    // initiative: 14
    expect(stats.initiative).toBe(14);

    // meleeDamageModifier: floor(12 / 2) = 6
    expect(stats.meleeDamageModifier).toBe(6);

    // rangedDamageModifier: floor(14 / 2) = 7
    expect(stats.rangedDamageModifier).toBe(7);

    // expForNextLevel: 3 * 100 = 300
    expect(stats.expForNextLevel).toBe(300);
  });

  it('should handle level 1 character', () => {
    const stats = calculateDerivedStats(testAttributes, 1);

    expect(stats.maxHP).toBe(42); // 10 + 30 + 2
    expect(stats.expForNextLevel).toBe(100);
  });

  it('should handle character with all minimum attributes', () => {
    const minAttributes: Attributes = {
      forca: 1,
      agilidade: 1,
      intelecto: 1,
      carisma: 1,
      hack: 1,
      vitalidade: 1,
    };

    const stats = calculateDerivedStats(minAttributes, 1);

    expect(stats.maxHP).toBe(15); // 10 + 3 + 2
    expect(stats.defense).toBe(10); // 10 + 0 + 0
    expect(stats.initiative).toBe(1);
    expect(stats.meleeDamageModifier).toBe(0);
    expect(stats.rangedDamageModifier).toBe(0);
    expect(stats.expForNextLevel).toBe(100);
  });

  it('should handle character with high attributes', () => {
    const maxAttributes: Attributes = {
      forca: 20,
      agilidade: 20,
      intelecto: 20,
      carisma: 20,
      hack: 20,
      vitalidade: 20,
    };

    const stats = calculateDerivedStats(maxAttributes, 10);

    expect(stats.maxHP).toBe(90); // 10 + 60 + 20
    expect(stats.defense).toBe(20); // 10 + 10 + 0
    expect(stats.initiative).toBe(20);
    expect(stats.meleeDamageModifier).toBe(10);
    expect(stats.rangedDamageModifier).toBe(10);
    expect(stats.expForNextLevel).toBe(1000);
  });
});
