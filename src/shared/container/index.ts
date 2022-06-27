import { container } from 'tsyringe';

import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';

import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/SpecificationsRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationRepository';

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
