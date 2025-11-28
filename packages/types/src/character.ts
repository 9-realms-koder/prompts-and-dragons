/**
 * Character types for NeonRealms RPG system
 */

export enum Archetype {
  NETRUNNER = 'netrunner',
  STREET_SAMURAI = 'street_samurai',
  TECHIE = 'techie',
  FACE = 'face',
  OPERATIVE = 'operative',
  RIGGER = 'rigger',
}

export interface Attributes {
  forca: number; // FOR - Strength
  agilidade: number; // AGI - Agility
  intelecto: number; // INT - Intellect
  carisma: number; // CAR - Charisma
  hack: number; // HAC - Hacking ability
  vitalidade: number; // VIT - Vitality
}

export interface Skills {
  armasLeves: number; // Light weapons (AGI)
  armasPesadas: number; // Heavy weapons (FOR)
  furtividade: number; // Stealth (AGI)
  investigacao: number; // Investigation (INT)
  hacking: number; // Hacking (HAC)
  medicina: number; // Medicine (INT)
  pilotagem: number; // Piloting (AGI)
  engenharia: number; // Engineering (INT)
}

export interface Character {
  id: string;
  userId: string;
  campaignId: string;
  name: string;
  archetype: Archetype;
  level: number;
  experience: number;
  attributes: Attributes;
  skills: Skills;
  hp: number;
  maxHp: number;
  credits: number;
  backstory?: string;
  status: CharacterStatus[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CharacterStatus {
  id: string;
  name: string;
  description: string;
  effect: StatusEffect;
  duration?: number; // turns remaining, undefined = permanent until removed
}

export interface StatusEffect {
  attributeModifiers?: Partial<Attributes>;
  skillModifiers?: Partial<Skills>;
  hpModifier?: number;
  damagePerTurn?: number;
}

export type CreateCharacterInput = Pick<Character, 'name' | 'archetype' | 'backstory'> & {
  attributePoints: Partial<Attributes>;
};
