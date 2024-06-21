import { AggregateRoot, EntityID, Optional, Slug } from '~/@shared/domain';

export enum UserRoles {
  ADMIN = "admin",
  USER = "user"
}

export type UserProps = {
  name: string;
  slug: Slug;
  email: string;
  password: string;
  identityCard: string;
  phone?: string | null;
  role: UserRoles;
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export class User extends AggregateRoot<UserProps> {
  constructor(props: UserProps, id?: EntityID) {
    super(props, id);
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
    this.props.slug = Slug.createFromText(name);
  }

  get slug() {
    return this.props.slug;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get identityCard() {
    return this.props.identityCard;
  }

  get phone() {
    return this.props.phone;
  }

  get avatar() {
    return this.props.avatar;
  }

  get role() {
    return this.props.role;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Optional<UserProps, 'createdAt' | 'slug' | 'updatedAt' | 'role'>,
    id?: EntityID
  ): User {
    const user = new User(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
        role: props.role ?? UserRoles.USER,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id
    );
    return user;
  }

  update(props: Partial<UserProps>): void {
    Object.assign(this.props, { ...props, updatedAt: new Date() });
  }

  toJSON() {
    return {
      id: this.id.toString(),
      name: this.name,
      slug: this.slug.value,
      email: this.email,
      phone: this.phone,
      avatar: this.avatar,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
