import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { Day } from 'src/data/interfaces/models.interface';

import { DaysApi } from 'src/data/api/days.api';
import { AppState } from 'src/data/redux/store';
import { setCurrentMonth } from 'src/data/redux/reducers/journal.reducer';

import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Skeleton } from 'src/components/ui/skeleton';
import DayCell from './day-cell/day-cell.component';

import style from './day-grid-overview.module.scss';
import StyleUtils from 'src/utils/style.utils';
const s = StyleUtils.styleMixer(style);

export default function DayGridOverview() {
  const dispatch = useDispatch();
  const currentMonth = useSelector((state: AppState) => state.journal.currentMonth);

  useEffect(() => {
    DaysApi.getDayCurrentMonth().then((res) => {
      if (!res) return;
      dispatch(setCurrentMonth(sortDays(res.data)));
    });
  }, []);

  const filledDays = fillDays(currentMonth ?? []);

  return (
    <div className={s('container')}>
      <Card className={s('card')}>
        <CardHeader>
          <CardTitle>Your journal</CardTitle>
        </CardHeader>

        {currentMonth ? (
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
            <CardContent className={s('overview-wrapper')}>
              <Masonry>
                {filledDays.map((day, i) => (
                  <DayCell day={day} key={i} />
                ))}
              </Masonry>
            </CardContent>
          </ResponsiveMasonry>
        ) : (
          <div className={s('skeleton')}>
            {[1, 2, 3, 4, 5].map(() => (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-[4rem] w-[4rem] rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-6 w-[200px]" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-6 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

function sortDays(days: Day[]): Day[] {
  return [...days].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export interface DisplayDay {
  date: string;
  data?: Omit<Day, 'date'>;
}

function fillDays(days: Day[]): DisplayDay[] {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);

  const result: DisplayDay[] = [];
  let dayPointer = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
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
        result.push({ date: new Date(date).toISOString(), data });
      }
    } else {
      result.push({ date: new Date(dp).toISOString() });
    }
  }

  return result;
}
