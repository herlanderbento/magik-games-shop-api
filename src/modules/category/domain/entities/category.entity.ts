import { AggregateRoot, EntityID, Optional } from '~/@shared/domain';

export type CategoryProps = {
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export class Category extends AggregateRoot<CategoryProps> {
  constructor(props: CategoryProps, id?: EntityID) {
    super(props, id);
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Optional<CategoryProps, 'createdAt' | 'updatedAt'>,
    id?: EntityID
  ): Category {
    return new Category(
      { ...props, createdAt: new Date(), updatedAt: new Date() },
      id
    );
  }

  update(props: Partial<CategoryProps>): void {
    Object.assign(this.props, { ...props, updatedAt: new Date() });
  }
  
  toJSON() {
    return {
      id: this.id.toString(),
      name: this.props.name,
      description: this.props.description,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    }; 
  }
}
