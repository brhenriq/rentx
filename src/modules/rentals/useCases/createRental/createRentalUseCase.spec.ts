import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/ResntalsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateRentalUseCase } from './createRentalUseCase';
import dayjs from 'dayjs';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementation/DayjsDateProvider';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    dayjsProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsProvider,
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '1234',
      car_id: '123456789',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '1234',
        car_id: '123456789',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: '1234',
        car_id: '123456789',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '1234',
        car_id: '123456789',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: '4321',
        car_id: '123456789',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '1234',
        car_id: '123456789',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
