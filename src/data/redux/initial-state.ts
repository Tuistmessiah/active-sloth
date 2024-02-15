import { startOfDay } from 'date-fns';
import { IJournalState, ISessionState, IUserState } from '../interfaces/redux.interface';

export const initJournal: IJournalState = {
  currentMonth: [],
  status: 'idle',
  selectedDay: { date: startOfDay(new Date()).toISOString(), data: undefined },
};

export const initSession: ISessionState = {
  triggers: {},
  loaders: {},
};

export const initialUserState: IUserState = {
  userData: null,
  isLoggedIn: false,
  isLogging: false,
  status: 'idle',
  error: null,
};
