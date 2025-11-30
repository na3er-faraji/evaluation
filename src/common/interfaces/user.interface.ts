import { UserRole } from '../enums/user-role.enum';

export interface UserInfo {
  id: string;
  email: string;
  role: UserRole;
}
