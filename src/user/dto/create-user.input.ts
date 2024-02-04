import { UserRole } from '../entities/user.entity';

export class CreateUserInput {
  name: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}
