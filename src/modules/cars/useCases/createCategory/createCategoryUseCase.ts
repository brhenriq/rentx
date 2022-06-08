import { ICategoriesRepository } from '../../repositories/implementations/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryExists = await this.categoriesRepository.findCategoryByName(
      name,
    );

    if (categoryExists) throw new Error('Category Already Exists!');

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
