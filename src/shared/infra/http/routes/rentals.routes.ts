import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/createRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/devolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/listRentalsByUserController';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalsRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle,
);
rentalsRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle,
);

export { rentalsRoutes };
