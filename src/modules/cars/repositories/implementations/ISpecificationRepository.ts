import { Specification } from '../../entities/Specification';

interface ISpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ description, name }: ISpecificationDTO): Promise<void>;
  findSpecificationByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, ISpecificationDTO };
