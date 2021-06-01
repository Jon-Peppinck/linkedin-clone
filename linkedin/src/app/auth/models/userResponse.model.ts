import { User } from './user.model';

export interface UserResponse {
  user: User;
  exp: number;
  iat: number;
}
