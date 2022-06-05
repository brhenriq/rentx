import { Category } from '../../entities/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): void;
  listAll(): Category[];
  findCategoryByName(name: string): Category;
}

export { ICategoriesRepository, ICreateCategoryDTO };
