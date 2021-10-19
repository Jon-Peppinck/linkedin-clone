import { User } from 'src/app/auth/models/user.model';
import { Conversation } from './Conversation';

export interface Message {
  id?: number;
  message?: string;
  user?: User;
  conversation?: Conversation;
  createdAt?: Date;
}
