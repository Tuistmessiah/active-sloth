import { Day } from './models.interface';

export interface IJournalState {
  currentMonth: Day[];
  status: 'idle';
}
