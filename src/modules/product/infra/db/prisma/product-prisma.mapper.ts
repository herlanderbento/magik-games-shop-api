import { Products as ProductsModel } from '@prisma/client';
import { EntityID } from '~/@shared/domain';
import { Product } from '~/modules/product/domain';

export class ProductPrismaMapper {
  static toModel(entity: Product) {
    return {
      id: entity.id.toString(),
      categoryId: entity.categoryId,
      slug: entity.slug.value,
      name: entity.name,
      description: entity.description,
      image: entity.image,
      price: entity.price,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toEntity(model: ProductsModel): Product {
    return Product.create(
      {
        categoryId: model.categoryId,
        name: model.name,
        description: model?.description,
        image: model.image,
        price: model.price,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
      },
      new EntityID(model.id)
    );
  }
}
