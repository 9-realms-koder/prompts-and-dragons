/**
 * NeonRealms Theme Engine
 *
 * Responsible for:
 * - Loading theme packs (cyberpunk, fantasy, etc)
 * - Providing archetypes, items, enemies
 * - UI theming
 *
 * TODO: Implement in issue #11
 */

export const THEME_ENGINE_VERSION = '0.1.0';

export interface Theme {
  id: string;
  name: string;
  description: string;
  archetypes: unknown[];
  items: unknown[];
  enemies: unknown[];
  ui: ThemeUI;
}

export interface ThemeUI {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  fontFamily: string;
}

// Default cyberpunk theme - to be expanded
export const cyberpunkTheme: Theme = {
  id: 'cyberpunk',
  name: 'Cyberpunk',
  description: 'Neon-lit streets, megacorporations, and cyber-enhanced humans',
  archetypes: [],
  items: [],
  enemies: [],
  ui: {
    primaryColor: '#ff2a6d',
    secondaryColor: '#05d9e8',
    accentColor: '#7b2cbf',
    backgroundColor: '#0d0221',
    fontFamily: 'Orbitron, sans-serif',
  },
};

export function getTheme(themeId: string): Theme {
  if (themeId === 'cyberpunk') {
    return cyberpunkTheme;
  }
  throw new Error(`Theme not found: ${themeId}`);
}
