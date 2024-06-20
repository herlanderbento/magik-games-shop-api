import { Category } from '~/modules/category/domain';

export type CategoryOutputProps = {
  id: string;
  name: string;
  description?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export class CategoryOutputMapper {
  static toOutput(entity: Category): CategoryOutputProps {
    return entity.toJSON();
  }
}
