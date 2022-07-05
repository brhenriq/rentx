import { getRepository, Repository } from 'typeorm';
import {
  ISpecificationDTO,
  ISpecificationsRepository,
} from '@modules/cars/repositories/ISpecificationRepository';
import { Specification } from '../entities/Specification';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({
    description,
    name,
  }: ISpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findSpecificationByName(name: string): Promise<Specification> {
    return this.repository.findOne({
      where: {
        name,
      },
    });
  }

  findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findByIds(ids);
  }
}

export { SpecificationsRepository };
