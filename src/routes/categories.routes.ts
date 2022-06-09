import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/createCategoryController';
import importCategoryController from '../modules/cars/useCases/importCategory';
import listAllCategoriesController from '../modules/cars/useCases/listAllCategories';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', (request, response) => {
  return listAllCategoriesController().handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController().handle(request, response);
});

export { categoriesRoutes };
