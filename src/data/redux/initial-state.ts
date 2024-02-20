import { IJournalState, ISessionState, IUserState } from '../interfaces/redux.interface';

export const initJournal: IJournalState = {
  currentMonth: undefined,
  status: 'idle',
  selectedDay: { date: undefined, data: undefined },
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
