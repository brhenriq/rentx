import { Specification } from '../entities/Specification';
import {
  ISpecificationDTO,
  ISpecificationsRepository,
} from './implementations/ISpecificationRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }

    return SpecificationsRepository.INSTANCE;
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
