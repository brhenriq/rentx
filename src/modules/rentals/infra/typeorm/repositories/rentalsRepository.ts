import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { getRepository, Repository } from 'typeorm';
import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({
      where: {
        car_id: car_id,
        end_date: null,
      },
    });
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({
      where: {
        user_id: user_id,
        end_date: null,
      },
    });
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
    end_date,
    id,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      end_date,
      id,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return this.repository.find({
      where: {
        user_id,
      },
      relations: ['car'],
    });
  }
}

export { RentalsRepository };
