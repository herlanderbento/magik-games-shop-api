import { prismaClient } from '~/@shared/infra';
import {
  Category,
  CategorySearchParams,
  CategorySearchResult,
  ICategoryRepository,
} from '~/modules/category/domain';
import { CategoryPrismaMapper } from './category-prisma.mapper';
import { NotFoundError } from '~/@shared/domain';

export class CategoryPrismaRepository implements ICategoryRepository {
  sortableFields: string[] = ['name', 'createdAt'];

  constructor(private prisma: typeof prismaClient) {}

  async insert(entity: Category): Promise<void> {
    const modelProps = CategoryPrismaMapper.toModel(entity);

    await this.prisma.categories.create({
      data: modelProps,
    });
  }

  async bulkInsert(entities: Category[]): Promise<void> {
    const modelsProps = entities.map((entity) =>
      CategoryPrismaMapper.toModel(entity)
    );

    await this.prisma.categories.createMany({
      data: modelsProps,
    });
  }

  async findById(id: string): Promise<Category | null> {
    const model = await this.prisma.categories.findUnique({
      where: {
        id,
      },
    });

    return model ? CategoryPrismaMapper.toEntity(model) : null;
  }

  async findByName(name: string): Promise<Category | null> {
    const model = await this.prisma.categories.findFirst({
      where: {
        name,
      },
    });

    return model ? CategoryPrismaMapper.toEntity(model) : null;
  }

  async findAll(): Promise<Category[]> {
    const models = await this.prisma.categories.findMany();

    return models.map((model) => {
      return CategoryPrismaMapper.toEntity(model);
    });
  }

  async search(props: CategorySearchParams): Promise<CategorySearchResult> {
    const count = await this.prisma.categories.count({
      ...(props.filter && {
        where: {
          name: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
    });

    const models = await this.prisma.categories.findMany({
      ...(props.filter && {
        where: {
          name: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
      orderBy: {
        createdAt: 'desc',
      },
      skip: (props.page - 1) * props.perPage,
      take: props.perPage,
    });

    return new CategorySearchResult({
      items: models.map((model) => CategoryPrismaMapper.toEntity(model)),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
    });
  }

  async update(entity: Category): Promise<void> {
    const modelProps = CategoryPrismaMapper.toModel(entity);

    const affectedRows = await this.prisma.categories.update({
      where: { id: entity.id.toString() },
      data: modelProps,
    });

    if (!affectedRows) {
      throw new NotFoundError(entity.id.toString(), this.getEntity());
    }
  }

  async delete(id: string): Promise<void> {
    await this.prisma.categories.delete({
      where: { id },
    });
  }

  getEntity(): new (...args: any[]) => Category {
    return Category;
  }
}
