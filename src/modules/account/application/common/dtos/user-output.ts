import { Slug } from '~/@shared/domain';
import { User, UserRoles } from '~/modules/account/domain';

export type UserOutput = {
  id: string;
  name: string;
  slug: Slug;
  email: string;
  identityCard: string;
  phone?: string | null;
  role: UserRoles;
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export class UserOutputMapper {
  static toOutput(user: User): UserOutput {
    return {
      id: user.id.toString(),
      name: user.name,
      //@ts-ignore
      slug: user.slug.value,
      email: user.email,
      identityCard: user.identityCard,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
