import { describe, it, expect, vi } from 'vitest';
import { parseRoll, roll } from './dice';

describe('parseRoll', () => {
  describe('valid notations', () => {
    it('should parse simple dice notation (d6)', () => {
      const result = parseRoll('d6');
      expect(result).toEqual({ count: 1, sides: 6, modifier: 0 });
    });

    it('should parse dice with count (2d6)', () => {
      const result = parseRoll('2d6');
      expect(result).toEqual({ count: 2, sides: 6, modifier: 0 });
    });

    it('should parse dice with positive modifier (1d20+5)', () => {
      const result = parseRoll('1d20+5');
      expect(result).toEqual({ count: 1, sides: 20, modifier: 5 });
    });

    it('should parse dice with negative modifier (3d8-2)', () => {
      const result = parseRoll('3d8-2');
      expect(result).toEqual({ count: 3, sides: 8, modifier: -2 });
    });

    it('should parse all standard dice types', () => {
      expect(parseRoll('d4')).toEqual({ count: 1, sides: 4, modifier: 0 });
      expect(parseRoll('d6')).toEqual({ count: 1, sides: 6, modifier: 0 });
      expect(parseRoll('d8')).toEqual({ count: 1, sides: 8, modifier: 0 });
      expect(parseRoll('d10')).toEqual({ count: 1, sides: 10, modifier: 0 });
      expect(parseRoll('d12')).toEqual({ count: 1, sides: 12, modifier: 0 });
      expect(parseRoll('d20')).toEqual({ count: 1, sides: 20, modifier: 0 });
      expect(parseRoll('d100')).toEqual({ count: 1, sides: 100, modifier: 0 });
    });

    it('should be case insensitive', () => {
      expect(parseRoll('D20')).toEqual({ count: 1, sides: 20, modifier: 0 });
      expect(parseRoll('2D6+3')).toEqual({ count: 2, sides: 6, modifier: 3 });
    });

    it('should parse large counts and modifiers', () => {
      expect(parseRoll('10d6+100')).toEqual({ count: 10, sides: 6, modifier: 100 });
      expect(parseRoll('100d100-50')).toEqual({ count: 100, sides: 100, modifier: -50 });
    });
  });

  describe('invalid notations', () => {
    it('should throw on empty string', () => {
      expect(() => parseRoll('')).toThrow('Invalid dice notation: ');
    });

    it('should throw on invalid format', () => {
      expect(() => parseRoll('abc')).toThrow('Invalid dice notation: abc');
      expect(() => parseRoll('20')).toThrow('Invalid dice notation: 20');
      expect(() => parseRoll('d')).toThrow('Invalid dice notation: d');
    });

    it('should throw on missing sides', () => {
      expect(() => parseRoll('2d')).toThrow('Invalid dice notation: 2d');
    });

    it('should throw on invalid characters', () => {
      expect(() => parseRoll('2d6*3')).toThrow('Invalid dice notation: 2d6*3');
      expect(() => parseRoll('2d6/2')).toThrow('Invalid dice notation: 2d6/2');
    });
  });
});

describe('roll', () => {
  describe('basic functionality', () => {
    it('should return correct structure', () => {
      const result = roll('1d6');

      expect(result).toHaveProperty('dice', '1d6');
      expect(result).toHaveProperty('results');
      expect(result).toHaveProperty('modifier', 0);
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('isCritical');
      expect(result).toHaveProperty('isFumble');
      expect(result).toHaveProperty('timestamp');
    });

    it('should return correct number of dice results', () => {
      expect(roll('1d6').results).toHaveLength(1);
      expect(roll('3d6').results).toHaveLength(3);
      expect(roll('5d8').results).toHaveLength(5);
    });

    it('should return results within valid range', () => {
      for (let i = 0; i < 100; i++) {
        const result = roll('1d6');
        expect(result.results[0]).toBeGreaterThanOrEqual(1);
        expect(result.results[0]).toBeLessThanOrEqual(6);
      }
    });

    it('should calculate total correctly with modifier', () => {
      // Mock Math.random to return predictable values
      const mockRandom = vi.spyOn(Math, 'random');
      mockRandom.mockReturnValue(0.5); // Will result in 4 for d6 (floor(0.5 * 6) + 1 = 4)

      const result = roll('2d6+3');
      expect(result.results).toEqual([4, 4]);
      expect(result.total).toBe(4 + 4 + 3); // 11

      mockRandom.mockRestore();
    });

    it('should handle negative modifiers', () => {
      const mockRandom = vi.spyOn(Math, 'random');
      mockRandom.mockReturnValue(0.5);

      const result = roll('1d6-2');
      expect(result.total).toBe(4 - 2); // 2

      mockRandom.mockRestore();
    });
  });

  describe('critical and fumble detection', () => {
    it('should detect critical on natural 20', () => {
      const mockRandom = vi.spyOn(Math, 'random').mockReturnValue(0.999);

      const result = roll('1d20');
      expect(result.results[0]).toBe(20);
      expect(result.isCritical).toBe(true);
      expect(result.isFumble).toBe(false);

      mockRandom.mockRestore();
    });

    it('should detect fumble on natural 1', () => {
      const mockRandom = vi.spyOn(Math, 'random').mockReturnValue(0);

      const result = roll('1d20');
      expect(result.results[0]).toBe(1);
      expect(result.isCritical).toBe(false);
      expect(result.isFumble).toBe(true);

      mockRandom.mockRestore();
    });

    it('should not detect critical/fumble on non-d20', () => {
      const mockRandom = vi.spyOn(Math, 'random').mockReturnValue(0.999);

      const result = roll('1d6');
      expect(result.isCritical).toBe(false);
      expect(result.isFumble).toBe(false);

      mockRandom.mockRestore();
    });

    it('should not detect critical/fumble on multiple d20', () => {
      const mockRandom = vi.spyOn(Math, 'random').mockReturnValue(0.999);

      const result = roll('2d20');
      expect(result.isCritical).toBe(false);
      expect(result.isFumble).toBe(false);

      mockRandom.mockRestore();
    });

    it('should not detect critical on d20 with modifier', () => {
      const mockRandom = vi.spyOn(Math, 'random').mockReturnValue(0.999);

      const result = roll('1d20+5');
      // Still should detect critical - the modifier doesn't affect natural roll
      expect(result.results[0]).toBe(20);
      expect(result.isCritical).toBe(true);

      mockRandom.mockRestore();
    });
  });

  describe('timestamp', () => {
    it('should include a valid timestamp', () => {
      const before = new Date();
      const result = roll('1d6');
      const after = new Date();

      expect(result.timestamp).toBeInstanceOf(Date);
      expect(result.timestamp.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(result.timestamp.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });
});
