import { container } from 'tsyringe';

import { DayjsDateProvider } from './DateProvider/implementation/DayjsDateProvider';
import { IDateProvider } from './DateProvider/IDateProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider);
