import { Categories as CategoryModel } from '@prisma/client';
import { EntityID } from '~/@shared/domain';
import { Category } from '~/modules/category/domain';

export class CategoryPrismaMapper {
  static toModel(entity: Category) {
    return {
      id: entity.id.toString(),
      name: entity.name,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toEntity(model: CategoryModel): Category {
    return Category.create(
      {
        name: model.name,
        description: model?.description,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
      },
      new EntityID(model.id)
    );
  }
}
