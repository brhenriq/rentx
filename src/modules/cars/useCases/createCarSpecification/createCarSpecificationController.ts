import { Request, Response } from 'express';
import { CreateCarSpecificationUseCase } from './createCarSpecificationUseCase';
import { container } from 'tsyringe';

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specification_id } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase,
    );

    const carSpecification = await createCarSpecificationUseCase.execute({
      car_id: id,
      specification_id,
    });

    return response.status(201).json(carSpecification);
  }
}

export { CreateCarSpecificationController };
