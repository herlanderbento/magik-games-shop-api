import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { InvalidUuidError } from '../errors';

export class EntityID {
  private value: string;

  toString() {
    return this.value;
  }

  toValue() {
    return this.value;
  }

  constructor(value?: string) {
    this.value = value ?? uuidv4();
    this.validate()
  }

  private validate(): void {
    const isValid: boolean = uuidValidate(this.value);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }

  public equals(id: EntityID) {
    return id.toValue() === this.value;
  }
}
