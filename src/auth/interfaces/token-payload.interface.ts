import { UserRole } from 'src/common/enums/user-role.enum';

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
}
