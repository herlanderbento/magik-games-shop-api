import { AggregateRoot, EntityID, Optional, Slug } from '~/@shared/domain';

export type ProductProps = {
  categoryId: string;
  name: string;
  slug: Slug;
  description?: string | null;
  price: number;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export class Product extends AggregateRoot<ProductProps> {
  constructor(props: ProductProps, id?: EntityID) {
    super(props, id);
  }

  get categoryId() {
    return this.props.categoryId;
  }

  get name() {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
    this.props.slug = Slug.createFromText(value);
  }

  get slug() {
    return this.props.slug;
  }

  get description() {
    return this.props.description;
  }

  get image() {
    return this.props.image;
  }

  get price() {
    return this.props.price;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Optional<ProductProps, 'createdAt' | 'updatedAt' | 'slug'>,
    id?: EntityID
  ): Product {
    return new Product(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id
    );
  }

  update(props: Partial<ProductProps>): void {
    Object.assign(this.props, { ...props, updatedAt: new Date() });
  }

  toJSON() {
    return {
      id: this.id.toString(),
      categoryId: this.props.categoryId,
      name: this.props.name,
      slug: this.props.slug.value,
      description: this.props.description,
      price: this.price,
      image: this.props.image,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
