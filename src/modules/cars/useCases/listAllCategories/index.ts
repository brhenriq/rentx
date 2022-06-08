import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { ListAllCategoriesController } from './listAllCategoriesController';
import { ListAllCategoriesUseCase } from './listAllCategoriesUseCase';

export default (): ListAllCategoriesController => {
  const categoriesRepository = new CategoriesRepository();
  const listAllCategoriesUseCase = new ListAllCategoriesUseCase(
    categoriesRepository,
  );
  const listAllCategoriesController = new ListAllCategoriesController(
    listAllCategoriesUseCase,
  );
  return listAllCategoriesController;
};
