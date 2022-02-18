import { Router } from 'express';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle;
});

categoriesRoutes.get('/', (request, response) => {
  const categories = categoriesRepository.listAll();

  return response.status(201).json(categories);
});

export { categoriesRoutes };
