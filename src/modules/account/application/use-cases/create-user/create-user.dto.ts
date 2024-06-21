import { UserOutput } from '../../common';

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  identityCard: string;
  phone?: string | null;
}

export type CreateUserOutput = UserOutput;
