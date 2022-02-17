import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryExists = this.categoriesRepository.findCategoryByName(name);

    if (categoryExists) throw new Error('Category Already Exists!');

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
