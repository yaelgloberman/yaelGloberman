import { Class } from './class.entity';

export const classesProviders = [
  {
    provide: 'CLASSES_REPOSITORY',
    useValue: Class,
  },
];