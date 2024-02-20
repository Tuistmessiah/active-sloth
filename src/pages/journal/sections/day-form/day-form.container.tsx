import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Day, Entry } from 'src/data/interfaces/models.interface';

import { DaysApi } from 'src/data/api/days.api';
import { AppState, dispatch } from 'src/data/redux/store';
import { setDay } from 'src/data/redux/reducers/journal.reducer';
import { setLoading } from 'src/data/redux/reducers/session.reducer';
import { formatDate, relativeTimeDifference } from 'src/utils/misc.utils';

import { useStateRef } from 'src/hooks/use-state-ref.hook';
import { useDebounce } from 'src/hooks/use-debounce.hook';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Input } from 'src/components/ui/input';
import EntryInput from './entry-input/entry-input.component';
import LoadingIcon from 'src/components/loading-icon/loading-icon.component';
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/ui/tooltip';
import { Skeleton } from 'src/components/ui/skeleton';

import { ReactComponent as CircleCheck } from 'src/assets/svgs/circle-check-svgrepo.svg';
import { ReactComponent as Circle } from 'src/assets/svgs/circle-svgrepo.svg';

import style from './day-form.module.scss';
import StyleUtils from 'src/utils/style.utils';
const s = StyleUtils.styleMixer(style);

const AUTO_SAVE_DELAY_MS = 4000;

const emptyDay: Day = {
  id: '',
  date: new Date().toISOString(),
  title: '',
  entries: [{ text: '', tag: undefined }],
};

export default function DayForm() {
  const autoSaveTimeout = useDebounce(AUTO_SAVE_DELAY_MS, 'run-last');

  const currentMonth = useSelector((state: AppState) => state.journal.currentMonth);
  const selectedDay = useSelector((state: AppState) => state.journal.selectedDay);
  const loadingSaveDay = useSelector((state: AppState) => state.session.loaders['save-day'] === 'loading');

  const [dayForm, setDayForm] = useState<Day>(emptyDay);
  const [[, saved], setSaved] = useStateRef(true);

  const lastEdit = useRef<number>(0);

  useEffect(() => selectForm(), [selectedDay]);
  useEffect(() => addEmptyEntry(), [dayForm]);

  // Dev: problematica
  /**
   * Queremos comecar o form com o dia today, mas para isso temos de ter o currentMonth
   * Idealmente, este form so renderiza com o currentMonth definido
   * Ao renderizar, devera ir buscar o selected. O selected, por sua vez, devera ser inicializado no overview.
   * No selected, so devera ter o id/date.
   */

  if (!currentMonth || !selectedDay.date) {
    return (
      <div className={s('skeleton')}>
        {[1, 2, 3, 4, 5].map(() => (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-[3rem] w-[3rem] rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-[250px]" />
              <Skeleton className="h-6 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // TODO: Pressing enter on Input should move cursor to first entry
  // TODO: Also auto save tags on change
  return (
    <div className={s('container')}>
      <Card className={s('card')}>
        <CardHeader>
          {selectedDay.date ?? <CardTitle>{formatDate(selectedDay.date)}</CardTitle>}
          <CardDescription>{relativeTimeDifference(selectedDay.date, new Date().toISOString())}</CardDescription>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={s('save-icon', { fill: !saved() })}>
                {loadingSaveDay ? <LoadingIcon /> : saved() ? <CircleCheck /> : <Circle className={s('save-btn')} onClick={() => saveChanges()} />}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{loadingSaveDay ? 'loading...' : saved() ? 'saved' : 'unsaved'}</p>
            </TooltipContent>
          </Tooltip>
        </CardHeader>
        <CardContent>
          {currentMonth ? (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input id="title" placeholder="Title" />
                </div>

                <div className={s('entries')}>
                  {dayForm?.entries.map((entry, index) => {
                    return (
                      <EntryInput
                        entry={entry}
                        update={(entry: Entry) => updateEntry(entry, index)}
                        onChange={() => {
                          lastEdit.current = Date.now();
                        }}
                        onBlur={() => ifIdleSave()}
                      />
                    );
                  })}
                </div>
              </div>
            </form>
          ) : (
            <div className={s('skeleton')}>
              {[1, 2, 3, 4, 5].map(() => (
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-[3rem] w-[3rem] rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-[250px]" />
                    <Skeleton className="h-6 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  function selectForm() {
    if (!currentMonth) return;

    // On first time (no selected day, defaults to today)
    if (!selectedDay.date) {
      setDayForm({ ...(currentMonth[0] || {}), date: currentMonth[0].date });
      return;
    }

    // Selected new day
    if (!selectedDay.data) {
      setDayForm({ ...emptyDay, date: selectedDay.date });
      return;
    }

    // Update existing day
    if (selectedDay.data) {
      setDayForm({ ...selectedDay.data, date: selectedDay.date });
      return;
    }
  }

  function addEmptyEntry() {
    if (dayForm.entries[dayForm.entries.length - 1].text) {
      let newEntries = [...dayForm.entries];
      newEntries.push({ text: '', tag: undefined });
      setDayForm((prevDayForm) => ({ ...prevDayForm, entries: newEntries }));
    }
  }

  function ifIdleSave() {
    autoSaveTimeout(() => {
      const timeSinceLastEdit = Date.now() - lastEdit.current;
      if (timeSinceLastEdit >= AUTO_SAVE_DELAY_MS) saveChanges();
    });
  }

  async function saveChanges() {
    if (saved()) return;

    const isUpdate = !!selectedDay.data;
    const trimmedForm = { ...dayForm, entries: dayForm.entries.filter((entry) => entry.text !== '') };
    dispatch(setLoading({ loadingType: 'save-day', loadingState: 'loading' }));

    if (isUpdate) {
      const res = await DaysApi.patchDay(trimmedForm.id, trimmedForm);
      if (!res) return;
      const updatedDay = { ...res.data };
      dispatch(setDay({ id: res.data.id, day: updatedDay }));
    } else {
      const res = await DaysApi.postDay(trimmedForm);
      if (!res) return;
      const newDay = { ...res.data };
      dispatch(setDay({ id: res.data.id, day: newDay }));
    }

    dispatch(setLoading({ loadingType: 'save-day', loadingState: 'idle' }));
    setSaved(true);
  }

  function updateEntry(entry: Entry, index: number) {
    let newEntries = [...dayForm.entries];
    newEntries[index] = entry;
    setDayForm((prevDayForm) => ({ ...prevDayForm, entries: newEntries }));
    if (saved()) setSaved(false);
  }
}
