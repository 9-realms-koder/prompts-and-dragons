import type { DiceRoll } from '@neonrealms/types';

/**
 * Parse dice notation (e.g., "2d6+3")
 */
export function parseRoll(notation: string): { count: number; sides: number; modifier: number } {
  const match = notation.match(/^(\d+)?d(\d+)([+-]\d+)?$/i);

  if (!match) {
    throw new Error(`Invalid dice notation: ${notation}`);
  }

  const sides = match[2];
  if (!sides) {
    throw new Error(`Invalid dice notation: ${notation}`);
  }

  return {
    count: parseInt(match[1] || '1', 10),
    sides: parseInt(sides, 10),
    modifier: parseInt(match[3] || '0', 10),
  };
}

/**
 * Roll dice with given notation
 */
export function roll(notation: string): DiceRoll {
  const { count, sides, modifier } = parseRoll(notation);

  const results: number[] = [];
  for (let i = 0; i < count; i++) {
    results.push(Math.floor(Math.random() * sides) + 1);
  }

  const sum = results.reduce((a, b) => a + b, 0);
  const total = sum + modifier;

  // Critical on natural 20 (d20 only)
  const isCritical = sides === 20 && count === 1 && results[0] === 20;
  // Fumble on natural 1 (d20 only)
  const isFumble = sides === 20 && count === 1 && results[0] === 1;

  return {
    dice: notation,
    results,
    modifier,
    total,
    isCritical,
    isFumble,
    timestamp: new Date(),
  };
}
