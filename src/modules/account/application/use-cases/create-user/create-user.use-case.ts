import { ICryptography, IUseCase } from '~/@shared/application';
import { CreateUserInput, CreateUserOutput } from './create-user.dto';
import { IUserRepository, User } from '~/modules/account/domain';
import { UserAlreadyExistsError, UserOutputMapper } from '../../common';

export class CreateUserUseCase
  implements IUseCase<CreateUserInput, CreateUserOutput>
{
  constructor(
    private userRepository: IUserRepository,
    private cryptography: ICryptography
  ) {}
  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const userWithSameEmail = await this.userRepository.findByEmail(
      input.email
    );

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await this.cryptography.hash(input.password);

    const entity = User.create({
      ...input,
      password: hashedPassword,
    });

    await this.userRepository.insert(entity);

    return UserOutputMapper.toOutput(entity);
  }
}
