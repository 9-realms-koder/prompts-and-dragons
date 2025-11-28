/**
 * NeonRealms Rules Engine
 *
 * Responsible for:
 * - Dice rolling
 * - Combat calculations
 * - Skill checks
 * - Character progression
 */

export { roll, parseRoll } from './dice';
export { calculateMaxHP, calculateDefense, calculateInitiative } from './formulas';

// TODO: Implement in issue #18
// export { skillCheck, attributeCheck } from './checks';
// export { attackRoll, damageRoll } from './combat';
