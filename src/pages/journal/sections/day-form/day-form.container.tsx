import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Day, Entry } from 'src/data/interfaces/models.interface';

import { DaysApi } from 'src/data/api/days.api';
import { AppState, dispatch } from 'src/data/redux/store';
import { selectDay, setDay } from 'src/data/redux/reducers/journal.reducer';
import { formatDate, relativeTimeDifference } from 'src/utils/misc.utils';

import { useDebounce } from 'src/hooks/use-debounce.hook';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import EntryInput from './entry-input/entry-input.component';
import { Input } from 'src/components/ui/input';

import { ReactComponent as CircleCheck } from 'src/assets/svgs/circle-check-svgrepo.svg';
import { ReactComponent as Circle } from 'src/assets/svgs/circle-svgrepo.svg';

import style from './day-form.module.scss';
import StyleUtils from 'src/utils/style.utils';
const s = StyleUtils.styleMixer(style);

const emptyDay: Day = {
  id: '',
  date: new Date().toISOString(),
  title: '',
  entries: [{ text: '', tag: undefined }],
};

export default function DayForm() {
  const timeOut2Sec = useDebounce(2000, 'run-last');

  const currentMonth = useSelector((state: AppState) => state.journal.currentMonth);
  const selectedDay = useSelector((state: AppState) => state.journal.selectedDay);

  const [dayForm, setDayForm] = useState<Day>(emptyDay);
  const [saved, setSaved] = useState(true);

  const lastEdit = useRef<number>(0);

  useEffect(() => {
    console.log({ selectedDay });
    const formDate = selectedDay.date ?? emptyDay.date;
    const formData = selectedDay.data ?? emptyDay;

    setDayForm({ ...formData, date: formDate });
  }, [selectedDay]);

  useEffect(() => {
    // Add empty entry at the end
    if (dayForm.entries[dayForm.entries.length - 1].text) {
      let newEntries = [...dayForm.entries];
      newEntries.push({ text: '', tag: undefined });
      setDayForm((prevDayForm) => ({ ...prevDayForm, entries: newEntries }));
    }
  }, [dayForm]);

  return (
    <div className={s('container')}>
      <Card className={s('card')}>
        <CardHeader>
          <CardTitle>{formatDate(selectedDay.date)}</CardTitle>
          <CardDescription>{relativeTimeDifference(selectedDay.date, new Date().toISOString())}</CardDescription>
          <div className={s('save-icon', { fill: !saved })}>{saved ? <CircleCheck /> : <Circle />}</div>
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
      <button className={s('submit')} onClick={() => saveChanges()}>
        Save
      </button>
    </div>
  );

  function ifIdleSave() {
    timeOut2Sec(() => {
      const timeSinceLastEdit = Date.now() - lastEdit.current;
      if (timeSinceLastEdit >= 2000) saveChanges();
    });
  }

  async function saveChanges() {
    const isUpdate = !!selectedDay.data;
    console.log('auto save');

    const trimmedForm = { ...dayForm, entries: dayForm.entries.filter((entry) => entry.text !== '') };
    console.log({
      dayForm,
      trimmedForm,
    });

    if (isUpdate) {
      const res = await DaysApi.patchDay(trimmedForm.id, trimmedForm);
      const updatedDay = { ...res.data };
      dispatch(setDay({ id: res.data.id, day: updatedDay }));
    } else {
      console.log({ trimmedForm });
      const res = await DaysApi.postDay(trimmedForm);
      const newDay = { ...res.data };
      dispatch(setDay({ id: res.data.id, day: newDay }));
      dispatch(selectDay({ date: selectedDay.date, data: newDay }));
    }

    setSaved(true);
  }

  function updateEntry(entry: Entry, index: number) {
    let newEntries = [...dayForm.entries];
    newEntries[index] = entry;
    setDayForm((prevDayForm) => ({ ...prevDayForm, entries: newEntries }));
    if (saved) setSaved(false);
  }
}
