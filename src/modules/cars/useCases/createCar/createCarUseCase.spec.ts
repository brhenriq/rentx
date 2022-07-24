import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './createCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car name',
      description: 'Car description',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'ABC-1234',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'First Car',
      description: 'First car description',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'ABC-1234',
      category_id: 'category',
    });

    await expect(
      createCarUseCase.execute({
        name: 'Second Car',
        description: 'Second car description',
        brand: 'Brand',
        daily_rate: 100,
        fine_amount: 60,
        license_plate: 'ABC-1234',
        category_id: 'category',
      }),
    ).rejects.toEqual(
      new AppError('Car already exists with this license plate'),
    );
  });

  it('should  be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'Car description',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'ABC-1234',
      category_id: 'category',
    });

    expect(car.available).toEqual(true);
  });
});
