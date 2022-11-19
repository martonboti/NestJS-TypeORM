import { User } from '../entities/user.api.entity';

export type UserType = Omit<User, 'hashPassword'>;
