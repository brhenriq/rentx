import { Category } from '../model/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  listAll(): Category[] {
    return this.categories;
  }

  findCategoryByName(name: string): Category {
    return this.categories.find(category => (category.name = name));
  }
}

export { CategoriesRepository };
