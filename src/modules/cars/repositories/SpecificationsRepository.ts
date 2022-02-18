import { Specification } from '../model/Specification';
import {
  ISpecificationDTO,
  ISpecificationsRepository,
} from './IspecificationRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ description, name }: ISpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);
  }

  findSpecificationByName(name: string): Specification {
    return this.specifications.find(
      specification => (specification.name = name),
    );
  }
}

export { SpecificationsRepository };
