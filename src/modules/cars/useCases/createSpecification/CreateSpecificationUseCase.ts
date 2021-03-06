import { inject, injectable } from 'tsyringe';
import { AppError } from '@errors/AppError';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationExists =
      await this.specificationsRepository.findSpecificationByName(name);

    if (specificationExists)
      throw new AppError('Specification Already Exists!');

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
