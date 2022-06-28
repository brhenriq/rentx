import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '@middlewares/ensureAuthenticated';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/createCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListAllCategoriesController } from '@modules/cars/useCases/listAllCategories/listAllCategoriesController';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listAllCategoriesController = new ListAllCategoriesController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get(
  '/',
  ensureAuthenticated,
  listAllCategoriesController.handle,
);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRoutes };
