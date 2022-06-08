import { getRepository, Repository } from 'typeorm';
import { Category } from '../entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from './implementations/ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = await this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  async listAll(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findCategoryByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({
      where: {
        name,
      },
    });

    return category;
  }
}

export { CategoriesRepository };
