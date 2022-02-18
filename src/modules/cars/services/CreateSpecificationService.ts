import { ISpecificationsRepository } from '../repositories/IspecificationRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const specificationExists =
      this.specificationsRepository.findSpecificationByName(name);

    if (specificationExists) throw new Error('Specification Already Exists!');

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationService };
