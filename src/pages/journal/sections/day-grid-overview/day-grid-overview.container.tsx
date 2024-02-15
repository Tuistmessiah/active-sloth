import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isSameDay, startOfDay } from 'date-fns';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { Day } from 'src/data/interfaces/models.interface';

import { DaysApi } from 'src/data/api/days.api';
import { AppState } from 'src/data/redux/store';
import { selectDay, setCurrentMonth } from 'src/data/redux/reducers/journal.reducer';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card';
import { ScrollArea } from 'src/components/ui/scroll-area';
import EntryInput from '../day-form/entry-input/entry-input.component';

import style from './day-grid-overview.module.scss';
import StyleUtils from 'src/utils/style.utils';
const s = StyleUtils.styleMixer(style);

export default function DayGridOverview() {
  const dispatch = useDispatch();
  const currentMonth = useSelector((state: AppState) => state.journal.currentMonth);
  const selectedDay = useSelector((state: AppState) => state.journal.selectedDay);

  useEffect(() => {
    DaysApi.getDayCurrentMonth().then((res) => {
      dispatch(setCurrentMonth(sortDays(res.data)));
    });
  }, []);

  const filledDays = fillDays(currentMonth);
  const today = startOfDay(new Date()).toISOString();

  return (
    <div className={s('container')}>
      <Card className={s('card')}>
        <CardHeader>
          <CardTitle>Your journal</CardTitle>
        </CardHeader>

        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <CardContent className={s('overview-wrapper')}>
            <Masonry>
              {filledDays.map((day, i) => {
                const date = new Date(day.date);

                return (
                  <div
                    onClick={() => dispatch(selectDay({ date: day.date }))}
                    key={i}
                    className={s('cell', { empty: !day.data, selected: isSameDay(date, new Date(selectedDay?.date)), today: isSameDay(date, new Date()) })}
                  >
                    <>
                      <div className={s('day-date')}>{date.getDate()}</div>
                      <ScrollArea className="">
                        <div className={s('day-card')}>
                          {/* Existing day */}
                          {day.data &&
                            day.data?.entries.map((entry, ii) => (
                              <div key={ii} className={s('entry')}>
                                {/* <p className={'tag'}>{entry.tag}:</p> {entry.text} */}
                                <EntryInput entry={entry} displayOptions={{ displayOnly: true }} />
                              </div>
                            ))}
                          {/* Empty day */}
                          {!day.data && <></>}
                        </div>
                      </ScrollArea>
                      <div className={s('border')} />
                    </>
                  </div>
                );
              })}
            </Masonry>
          </CardContent>
        </ResponsiveMasonry>
      </Card>
    </div>
  );
}

function sortDays(days: Day[]): Day[] {
  return [...days].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

interface DisplayDay {
  date: string;
  data?: Omit<Day, 'date'>;
}

function fillDays(days: Day[]): DisplayDay[] {
  const today = new Date();
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
        result.push({ date: new Date(date).toISOString(), data });
      }
    } else {
      result.push({ date: new Date(dp).toISOString() });
    }
  }

  return result;
}
