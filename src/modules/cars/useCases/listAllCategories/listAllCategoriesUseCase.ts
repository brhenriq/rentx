import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../../repositories/implementations/ICategoriesRepository';

class ListAllCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.listAll();

    return categories;
  }
}

export { ListAllCategoriesUseCase };
