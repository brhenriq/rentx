import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/createCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListAllCategoriesController } from '@modules/cars/useCases/listAllCategories/listAllCategoriesController';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listAllCategoriesController = new ListAllCategoriesController();

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle,
);

categoriesRoutes.get(
  '/',
  ensureAuthenticated,
  listAllCategoriesController.handle,
);

categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRoutes };
