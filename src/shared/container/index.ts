import { container } from 'tsyringe';

import { CategoriesRepository } from '../../modules/cars/repositories/CategoriesRepository';
import { ICategoriesRepository } from '../../modules/cars/repositories/implementations/ICategoriesRepository';

import { ISpecificationsRepository } from '../../modules/cars/repositories/implementations/ISpecificationRepository';
import { SpecificationsRepository } from '../../modules/cars/repositories/SpecificationsRepository';

import { IUsersRepository } from '../../modules/accounts/repositories/implementations/IUsersRepository';
import { UsersRepository } from '../../modules/accounts/repositories/UsersRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
