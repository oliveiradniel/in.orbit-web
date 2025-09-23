import type { User } from '@/entities/User';

export type UserResponse = Omit<User, 'externalAccountId'>;
