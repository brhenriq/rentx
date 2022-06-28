import { getRepository, Repository } from 'typeorm';
import { Specification } from '@modules/cars/entities/Specification';
import {
  ISpecificationDTO,
  ISpecificationsRepository,
} from '@modules/cars/repositories/ISpecificationRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ description, name }: ISpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async findSpecificationByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({
      where: {
        name,
      },
    });

    return specification;
  }
}

export { SpecificationsRepository };
