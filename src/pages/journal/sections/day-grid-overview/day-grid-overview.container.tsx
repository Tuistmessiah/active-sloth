import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState, dispatch } from 'src/data/redux/store';
import { setCurrentMonth } from 'src/data/redux/reducers/journaling.reducer';
import { DaysService } from 'src/data/api-client/services/DaysService';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card';

import style from './day-grid-overview.module.scss';
import StyleUtils from 'src/utils/style.utils';
import { Day } from 'src/data/interfaces/models.interface';
const s = StyleUtils.styleMixer(style);

export default function DayGridOverview() {
  const currentMonth = useSelector((state: AppState) => state.journal.currentMonth);

  useEffect(() => {
    DaysService.getApiV1DayCurrentMonth().then((res) => {
      dispatch(setCurrentMonth(sortDays(res.data)));
      console.log(res.data);
    });
  }, []);

  const filledDays = fillDays(currentMonth);

  return (
    <div className={s('container')}>
      <Card className={s('card')}>
        <CardHeader>
          <CardTitle>Today</CardTitle>
          <CardDescription>Write your journal here...</CardDescription>
        </CardHeader>

        <CardContent className={s('overview-wrapper')}>
          <div className={s('overview-main')}>
            {filledDays.map((day, i) => {
              const date = new Date(day.date);
              return (
                <div key={i} className={s('day-card', { empty: !day.data })}>
                  <div className={s('day-date')}>{date.toDateString()}</div>
                  {/* Existing day */}
                  {day.data &&
                    day.data?.entries.map((entry, ii) => (
                      <div key={ii} className={s('entry')}>
                        <span className={'tag'}>{entry.tag}:</span> {entry.text}
                      </div>
                    ))}
                  {/* Empty day */}
                  {!day.data && <></>}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function sortDays(days: Day[]): Day[] {
  return [...days].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

interface DisplayDay {
  date: Date;
  data?: Omit<Day, 'date'>;
}

function fillDays(days: Day[]): DisplayDay[] {
  const today = new Date('2024-02-20T23:00:00.000Z'); // Dev: Change this to effectively today
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);

  const result: DisplayDay[] = [];
  let dayPointer = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 23, 0, 0, 0);

  const diffTime = Math.abs(dayPointer.getTime() - startOfMonth.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const maxIterations = diffDays + 1;

  const daysMap = new Map(
    days.map((day) => {
      const dayDate = new Date(day.date);
      const dateKey = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate()).getTime();
      return [dateKey, day];
    })
  );

  for (let i = 0, dp = dayPointer; dp >= startOfMonth && i < maxIterations; dp.setDate(dp.getDate() - 1), i++) {
    const dayKey = new Date(dp.getFullYear(), dp.getMonth(), dp.getDate()).getTime();

    if (daysMap.has(dayKey)) {
      const dayData = daysMap.get(dayKey);
      if (dayData) {
        const { date, ...data } = dayData;
        result.push({ date: new Date(date), data });
      }
    } else {
      result.push({ date: new Date(dp) });
    }
  }

  return result.reverse();
}
