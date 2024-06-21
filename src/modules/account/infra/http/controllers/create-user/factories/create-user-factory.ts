import { CreateUserUseCase } from '~/modules/account/application';
import { BcryptHasher } from '~/modules/account/infra/cryptography';
import { CreateUserController } from '../create-user.controller';
import { prismaClient } from '~/@shared/infra';
import { UserPrismaRepository } from '~/modules/account/infra/db';

const userRepository = new UserPrismaRepository(prismaClient);

const cryptographyHasher = new BcryptHasher();
const useCase = new CreateUserUseCase(userRepository, cryptographyHasher);
const createUserFactory = new CreateUserController(useCase);

export { createUserFactory };
