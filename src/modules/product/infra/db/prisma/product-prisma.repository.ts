import { prismaClient } from '~/@shared/infra';
import { Product } from '~/modules/product/domain';
import {
  IProductRepository,
  ProductSearchParams,
  ProductSearchResult,
} from '~/modules/product/domain/repository';
import { ProductPrismaMapper } from './product-prisma.mapper';
import { NotFoundError } from '~/@shared/domain';
import { Prisma } from '@prisma/client';

export class ProductPrismaRepository implements IProductRepository {
  constructor(private prisma: typeof prismaClient) {}

  async insert(entity: Product): Promise<void> {
    const modelProps = ProductPrismaMapper.toModel(entity);

    await this.prisma.products.create({
      data: modelProps,
    });
  }
  async bulkInsert(entities: Product[]): Promise<void> {
    const modelsProps = entities.map((entity) =>
      ProductPrismaMapper.toModel(entity)
    );

    await this.prisma.products.createMany({
      data: modelsProps,
    });
  }

  async findById(id: string): Promise<Product | null> {
    const modelProps = await this.prisma.products.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!modelProps) {
      throw new NotFoundError(id, this.getEntity());
    }

    return modelProps ? ProductPrismaMapper.toEntity(modelProps) : null;
  }

  async findBySlug(slug: string): Promise<Product | null> {
    const model = await this.prisma.products.findFirst({
      where: {
        slug,
      },
    });

    return model ? ProductPrismaMapper.toEntity(model) : null;
  }

  async findAll(): Promise<Product[]> {
    const models = await this.prisma.products.findMany();

    return models.map((model) => {
      return ProductPrismaMapper.toEntity(model);
    });
  }

  async findByName(name: string): Promise<Product | null> {
    const model = await this.prisma.products.findFirst({
      where: {
        name,
      },
    });

    return model ? ProductPrismaMapper.toEntity(model) : null;
  }

  async search(props: ProductSearchParams): Promise<ProductSearchResult> {
    const where: Prisma.ProductsWhereInput = {};

    if (
      props.filter &&
      (props.filter.name || props.filter.categoryId || props.filter.price)
    ) {
      if (props.filter.name) {
        where.name = {
          contains: props.filter.name,
          mode: 'insensitive',
        };
      }

      if (props.filter.categoryId) {
        where.categoryId = {
          contains: props.filter.categoryId,
        };
      }

      if (props.filter.price) {
        where.price = {
          equals: props.filter.price,
        };
      }
    }

    const count = await this.prisma.products.count({
      where,
    });

    const models = await this.prisma.products.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (props.page - 1) * props.perPage,
      take: props.perPage,
    });

    return new ProductSearchResult({
      items: models.map((model) => ProductPrismaMapper.toEntity(model)),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
    });
  }
  async update(entity: Product): Promise<void> {
    const modelProps = ProductPrismaMapper.toModel(entity);

    const affectedRows = await this.prisma.products.update({
      where: { id: entity.id.toString() },
      data: modelProps,
    });

    if (!affectedRows) {
      throw new NotFoundError(entity.id.toString(), this.getEntity());
    }
  }
  async delete(id: string): Promise<void> {
    await this.prisma.products.delete({
      where: { id },

    });
  }

  getEntity(): new (...args: any[]) => Product {
    return Product;
  }
}
