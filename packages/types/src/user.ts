/**
 * User types for NeonRealms RPG system
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  provider: AuthProvider;
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum AuthProvider {
  GOOGLE = 'google',
  DISCORD = 'discord',
}

export interface Session {
  userId: string;
  expiresAt: Date;
}
