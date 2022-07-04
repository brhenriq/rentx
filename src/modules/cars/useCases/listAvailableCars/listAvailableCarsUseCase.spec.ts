import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './listAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'ABC-1234',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'CarNameTest',
      description: 'Car description',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'ABC-1235',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'CarNameTest',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'CarBrandTest',
      description: 'Car description',
      brand: 'BrandTest',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'ABC-1236',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'BrandTest',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'CarCategoryTest',
      description: 'Car description',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'ABC-1237',
      category_id: 'categoryTest',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'categoryTest',
    });

    expect(cars).toEqual([car]);
  });
});
