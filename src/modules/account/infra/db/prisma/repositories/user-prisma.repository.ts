import { prismaClient } from '~/@shared/infra';
import {
  IUserRepository,
  User,
  UserSearchParams,
  UserSearchResult,
} from '~/modules/account/domain';
import { UserPrismaMapper } from '../mappers';
import { Prisma } from '@prisma/client';
import { NotFoundError } from '~/@shared/domain';

export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: typeof prismaClient) {}

  async insert(entity: User): Promise<void> {
    const modelProps = UserPrismaMapper.toModel(entity);

    await this.prisma.users.create({
      data: modelProps,
    });
  }

  async bulkInsert(entities: User[]): Promise<void> {
    const modelsProps = entities.map((entity) =>
      UserPrismaMapper.toModel(entity)
    );

    await this.prisma.users.createMany({
      data: modelsProps,
    });
  }
  
  async findById(id: string): Promise<User | null> {
    const modelProps = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    return modelProps ? UserPrismaMapper.toEntity(modelProps) : null;
  }
  async findByIds(ids: string[]): Promise<User[]> {
    const modelsProps = await this.prisma.users.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return modelsProps.map(UserPrismaMapper.toEntity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const modelProps = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    return modelProps ? UserPrismaMapper.toEntity(modelProps) : null;
  }
  async findByPhone(phone: string): Promise<User | null> {
    const modelProps = await this.prisma.users.findFirst({
      where: {
        phone,
      },
    });

    return modelProps ? UserPrismaMapper.toEntity(modelProps) : null;
  }
  async findBySlug(slug: string): Promise<User | null> {
    const modelProps = await this.prisma.users.findFirst({
      where: {
        slug,
      },
    });

    return modelProps ? UserPrismaMapper.toEntity(modelProps) : null;
  }

  async findAll(): Promise<User[]> {
    const modelsProps = await this.prisma.users.findMany();

    return modelsProps.map(UserPrismaMapper.toEntity);
  }

  async search(props: UserSearchParams): Promise<UserSearchResult> {
    const where: Prisma.UsersWhereInput = {};

    if (props.filter && (props.filter.name || props.filter.email)) {
      if (props.filter.name) {
        where.name = {
          contains: props.filter.name,
          mode: 'insensitive',
        };
      }

      if (props.filter.email) {
        where.email = {
          contains: props.filter.email,
          mode: 'insensitive',
        };
      }
    }

    const count = await this.prisma.users.count({
      where,
    });

    const models = await this.prisma.users.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      skip: (props.page - 1) * props.perPage,
      take: props.perPage,
    });

    return new UserSearchResult({
      items: models.map((model) => UserPrismaMapper.toEntity(model)),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
    });
  }
  async update(entity: User): Promise<void> {
    const modelProps = UserPrismaMapper.toModel(entity);

    const affectedRows = await this.prisma.users.update({
      where: {
        id: entity.id.toString(),
      },
      data: modelProps,
    });

    if (!affectedRows) {
      throw new NotFoundError(entity.id.toString(), this.getEntity());
    }
  }

  async delete(id: string): Promise<void> {
    await this.prisma.users.delete({
      where: { id },
    });
  }
  getEntity(): new (...args: any[]) => User {
    return User;
  }
}
