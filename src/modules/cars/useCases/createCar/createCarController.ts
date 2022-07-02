import { Request, Response } from 'express';
import { CreateCarUseCase } from './createCarUseCase';
import { container } from 'tsyringe';

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    } = request.body;

    const createCategoryUseCase = container.resolve(CreateCarUseCase);

    const car = await createCategoryUseCase.execute({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    return response.status(201).json(car);
  }
}

export { CreateCarController };
