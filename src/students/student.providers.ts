import { Student } from './student.entity';

export const studentsProviders = [
  {
    provide: 'STUDENTS_REPOSITORY',
    useValue: Student,
  },
];