import { Day } from './models.interface';

export interface IJournalState {
  currentMonth: Day[] | undefined;
  status: 'idle';
  selectedDay: {
    date?: string;
    data?: Day;
  };
}

export interface ISessionState {
  triggers: {
    [K in TriggerPayload['name']]?: TriggerPayload; // Map trigger names to their payloads
  };
  loaders: {
    [key in Loaders]?: LoadingState;
  };
}

// TODO: Type user (from API and api client too!)
export interface IUserState {
  userData: any | null;
  isLoggedIn: boolean;
  isLogging: boolean;
  status: 'idle';
  error: null;
}

/**
 * * Session
 */

export type Loaders = 'login' | 'save-day';
export type LoadingState = 'idle' | 'loading';

export type TriggerPayload = TriggerNotification | Trigger2;
export type TriggerName = TriggerPayload['name'];
export type TriggerPayloadMap = {
  [K in TriggerPayload['name']]: Extract<TriggerPayload, { name: K }>;
};

interface TriggerNotification {
  name: 'trigger-notification';
  message: string;
}

interface Trigger2 {
  name: 'trigger-2';
  message: string;
}
