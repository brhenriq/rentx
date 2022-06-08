import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../../repositories/implementations/ICategoriesRepository';

class ListAllCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.listAll();

    return categories;
  }
}

export { ListAllCategoriesUseCase };
