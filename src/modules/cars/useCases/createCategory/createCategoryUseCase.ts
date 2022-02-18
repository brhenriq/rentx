import { ICategoriesRepository } from '../../repositories/implementations/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryExists = this.categoriesRepository.findCategoryByName(name);

    if (categoryExists) throw new Error('Category Already Exists!');

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
