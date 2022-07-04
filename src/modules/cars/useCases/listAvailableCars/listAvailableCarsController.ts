import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAvailableCarsUseCase } from './listAvailableCarsUseCase';

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, category_id, name } = request.query as {
      category_id?: string;
      brand?: string;
      name?: string;
    };

    const listAllCarsUseCase = container.resolve(ListAvailableCarsUseCase);

    const cars = await listAllCarsUseCase.execute({ brand, category_id, name });

    return response.json(cars);
  }
}

export { ListAvailableCarsController };
