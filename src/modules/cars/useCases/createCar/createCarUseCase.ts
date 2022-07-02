import { ICreateCarsDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    name,
    brand,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    category_id,
  }: ICreateCarsDTO): Promise<Car> {
    const carExists = await this.carsRepository.findByLicensePlate(
      license_plate,
    );

    if (carExists) {
      throw new AppError('Car already exists with this license plate');
    }

    const car = await this.carsRepository.create({
      name,
      brand,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      category_id,
    });

    return car;
  }
}

export { CreateCarUseCase };
