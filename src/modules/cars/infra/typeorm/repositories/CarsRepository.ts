import { ICreateCarsDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { getRepository, Repository } from 'typeorm';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    id,
    specifications,
  }: ICreateCarsDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({
      where: {
        license_plate: license_plate,
      },
    });
  }

  async findAllAvailableCars(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (brand) carsQuery.andWhere('c.brand = :brand', { brand });
    if (category_id)
      carsQuery.andWhere('c.category_id = :category_id', { category_id });
    if (name) carsQuery.andWhere('c.name = :name', { name });

    const cars = await carsQuery.getMany();

    return cars;
  }

  findById(id: string): Promise<Car> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }
}

export { CarsRepository };
