import { User } from 'src/app/auth/models/user.model';

export interface Post {
  id: number;
  body: string;
  createdAt: Date;
  author: User;
}
