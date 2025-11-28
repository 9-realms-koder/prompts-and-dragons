/**
 * Campaign types for NeonRealms RPG system
 */

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  theme: string;
  settings: CampaignSettings;
  inviteCode: string;
  isPublic: boolean;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CampaignSettings {
  tone: CampaignTone;
  difficulty: CampaignDifficulty;
  style: CampaignStyle;
}

export enum CampaignTone {
  GRITTY = 'gritty', // Dark, realistic
  BALANCED = 'balanced', // Mix of light and dark
  HEROIC = 'heroic', // Players are heroes
}

export enum CampaignDifficulty {
  EASY = 'easy',
  NORMAL = 'normal',
  HARD = 'hard',
  NIGHTMARE = 'nightmare',
}

export enum CampaignStyle {
  COMBAT = 'combat', // Focus on combat
  NARRATIVE = 'narrative', // Focus on story
  BALANCED = 'balanced', // Mix of both
}

export interface CampaignMember {
  id: string;
  campaignId: string;
  userId: string;
  role: CampaignRole;
  joinedAt: Date;
}

export enum CampaignRole {
  OWNER = 'owner',
  PLAYER = 'player',
}

export type CreateCampaignInput = Pick<Campaign, 'name' | 'description' | 'isPublic'> & {
  settings: CampaignSettings;
};
