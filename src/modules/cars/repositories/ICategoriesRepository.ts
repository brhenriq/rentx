import { Category } from '@modules/cars/entities/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
  listAll(): Promise<Category[]>;
  findCategoryByName(name: string): Promise<Category>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
