import { request } from './request';

import { Day } from '../interfaces/models.interface';
import { CreateDayRES, GetDaysInCurrentMonthRES, UpdateDayRES } from '../interfaces/api.interface';

export class DaysApi {
  public static getDayCurrentMonth(): Promise<GetDaysInCurrentMonthRES | null> {
    return request('/day/currentMonth', { method: 'GET' });
  }

  public static patchDay(id: string, body: Day): Promise<UpdateDayRES | null> {
    return request(`/day/${id}`, { method: 'PATCH', body });
  }

  public static postDay(body: Day): Promise<CreateDayRES | null> {
    return request(`/day`, { method: 'POST', body });
  }
}
