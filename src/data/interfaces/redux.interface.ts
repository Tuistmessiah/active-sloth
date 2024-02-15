import { Day } from './models.interface';

export interface IJournalState {
  currentMonth: Day[];
  status: 'idle';
  selectedDay: {
    date: string;
    data?: Day;
  };
}

export interface ISessionState {
  triggers: {
    [K in TriggerPayload['name']]?: TriggerPayload; // Map trigger names to their payloads
  };
}

export interface IUserState {}

/**
 * * Session
 */

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
