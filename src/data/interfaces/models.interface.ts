import { DayDTO, EntryDTO } from './api.interface';

export type Day = DayDTO;

export type Entry = EntryDTO;

export interface TagDetails {
  Icon: JSX.Element | undefined;
  color: string;
  displayName: string;
}
