/**
 * Game mechanics types for NeonRealms RPG system
 */

// Dice types
export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

export interface DiceRoll {
  dice: string; // e.g., "2d6+3"
  results: number[]; // Individual dice results
  modifier: number;
  total: number;
  isCritical: boolean;
  isFumble: boolean;
  timestamp: Date;
}

export interface RollContext {
  characterId: string;
  attribute?: keyof import('./character').Attributes;
  skill?: keyof import('./character').Skills;
  advantage?: boolean;
  disadvantage?: boolean;
  reason?: string;
}

// Combat types
export interface Combat {
  id: string;
  campaignId: string;
  status: CombatStatus;
  round: number;
  currentTurnIndex: number;
  initiativeOrder: InitiativeEntry[];
  log: CombatLogEntry[];
  startedAt: Date;
  endedAt?: Date;
}

export enum CombatStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  VICTORY = 'victory',
  DEFEAT = 'defeat',
  FLED = 'fled',
}

export interface InitiativeEntry {
  characterId: string;
  name: string;
  initiative: number;
  isNPC: boolean;
  isPlayer: boolean;
}

export interface CombatLogEntry {
  id: string;
  round: number;
  actorId: string;
  actorName: string;
  action: CombatAction;
  targetId?: string;
  targetName?: string;
  roll?: DiceRoll;
  damage?: number;
  description: string;
  timestamp: Date;
}

export enum CombatAction {
  ATTACK = 'attack',
  DEFEND = 'defend',
  HACK = 'hack',
  USE_ITEM = 'use_item',
  ABILITY = 'ability',
  MOVE = 'move',
  FLEE = 'flee',
}

// Message types
export interface Message {
  id: string;
  campaignId: string;
  type: MessageType;
  content: string;
  author: MessageAuthor;
  metadata?: MessageMetadata;
  threadId?: string;
  createdAt: Date;
}

export enum MessageType {
  NARRATIVE = 'narrative',
  PLAYER = 'player',
  SYSTEM = 'system',
  COMBAT = 'combat',
  ROLL = 'roll',
  WHISPER = 'whisper',
}

export interface MessageAuthor {
  id: string;
  name: string;
  avatar?: string;
  isAI: boolean;
}

export interface MessageMetadata {
  rollResult?: DiceRoll;
  combatLog?: CombatLogEntry;
}
