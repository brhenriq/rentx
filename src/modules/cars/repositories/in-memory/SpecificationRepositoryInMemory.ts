import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import {
  ISpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationRepository';

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({
    description,
    name,
  }: ISpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });

    this.specifications.push(specification);

    return specification;
  }

  async findSpecificationByName(name: string): Promise<Specification> {
    return this.specifications.find(
      specification => specification.name === name,
    );
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter(specification =>
      ids.includes(specification.id),
    );
  }
}

export { SpecificationRepositoryInMemory };
