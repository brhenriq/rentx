import { inject, injectable } from 'tsyringe';
import { AppError } from '@errors/AppError';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryExists = await this.categoriesRepository.findCategoryByName(
      name,
    );

    if (categoryExists) throw new AppError('Category Already Exists!');

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
