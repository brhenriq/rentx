import { container } from 'tsyringe';

import { DayjsDateProvider } from './DateProvider/implementation/DayjsDateProvider';
import { IDateProvider } from './DateProvider/IDateProvider';

import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { IMailProvider } from './MailProvider/IMailProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
