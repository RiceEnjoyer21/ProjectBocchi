import { UserProfile } from './user-profile';

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  profile: UserProfile;
}
