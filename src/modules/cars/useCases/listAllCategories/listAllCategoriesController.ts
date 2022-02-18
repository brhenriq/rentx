import { Request, Response } from 'express';
import { ListAllCategoriesUseCase } from './listAllCategoriesUseCase';

class ListAllCategoriesController {
  constructor(private listAllCategoriesUseCase: ListAllCategoriesUseCase) {}

  handle(request: Request, response: Response) {
    const categories = this.listAllCategoriesUseCase.execute();

    return response.json(categories);
  }
}

export { ListAllCategoriesController };
