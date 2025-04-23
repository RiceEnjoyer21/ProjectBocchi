import { Group } from './group';

export interface UserProfile {
  bio: string;
  avatar: string | null;
  favorite_groups: Group[];
}
