import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Day, Entry } from 'src/data/interfaces/models.interface';

import { DaysApi } from 'src/data/api/days.api';
import { AppState, dispatch } from 'src/data/redux/store';
import { selectDay, setDay } from 'src/data/redux/reducers/journal.reducer';
import { setLoading } from 'src/data/redux/reducers/session.reducer';
import { formatDate, relativeTimeDifference } from 'src/utils/misc.utils';

import { useStateRef } from 'src/hooks/use-state-ref.hook';
import { useDebounce } from 'src/hooks/use-debounce.hook';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Input } from 'src/components/ui/input';
import EntryInput from './entry-input/entry-input.component';
import LoadingIcon from 'src/components/loading-icon/loading-icon.component';
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/ui/tooltip';

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

  const selectedDay = useSelector((state: AppState) => state.journal.selectedDay);
  const loadingSaveDay = useSelector((state: AppState) => state.session.loaders['save-day'] === 'loading');

  const [dayForm, setDayForm] = useState<Day>(emptyDay);
  const [[, saved], setSaved] = useStateRef(true);

  const lastEdit = useRef<number>(0);

  useEffect(() => selectForm(), [selectedDay]);
  useEffect(() => addEmptyEntry(), [dayForm]);

  return (
    <div className={s('container')}>
      <Card className={s('card')}>
        <CardHeader>
          <CardTitle>{formatDate(selectedDay.date)}</CardTitle>
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
          <form>
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
        </CardContent>
      </Card>
    </div>
  );

  function selectForm() {
    const formDate = selectedDay.date ?? emptyDay.date;
    const formData = selectedDay.data ?? emptyDay;

    setDayForm({ ...formData, date: formDate });
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
      const updatedDay = { ...res.data };
      dispatch(setDay({ id: res.data.id, day: updatedDay }));
    } else {
      const res = await DaysApi.postDay(trimmedForm);
      const newDay = { ...res.data };
      dispatch(setDay({ id: res.data.id, day: newDay }));
      dispatch(selectDay({ date: selectedDay.date, data: newDay }));
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
