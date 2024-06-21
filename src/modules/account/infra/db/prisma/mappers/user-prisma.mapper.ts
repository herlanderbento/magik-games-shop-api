import { Users as UserModel } from '@prisma/client';
import { EntityID, Slug } from '~/@shared/domain';
import { User, UserRoles } from '~/modules/account/domain';

export class UserPrismaMapper {
  static toModel(entity: User) {
    return {
      id: entity.id.toString(),
      name: entity.name,
      slug: entity.slug.value,
      email: entity.email,
      password: entity.password,
      identityCard: entity.identityCard,
      phone: entity.phone,
      avatar: entity.avatar,
      role: entity.role,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toEntity(model: UserModel) {
    return User.create(
      {
        name: model.name,
        slug: Slug.create(model.slug),
        email: model.email,
        password: model.password,
        identityCard: model.identityCard,
        phone: model?.phone,
        avatar: model.avatar,
        role: model.role as UserRoles,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
      },
      new EntityID(model.id)
    );
  }
}
