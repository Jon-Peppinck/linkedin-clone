import { User } from 'src/auth/models/user.class';

export interface Conversation {
  id?: number;
  users?: User[];
  lastUpdated?: Date;
}
