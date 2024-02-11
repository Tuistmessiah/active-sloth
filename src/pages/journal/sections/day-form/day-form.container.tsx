import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { startOfDay } from 'date-fns';

import { Day, Entry } from 'src/data/interfaces/models.interface';
import { Tag } from 'src/data/interfaces/api.interface';

import { AppState } from 'src/data/redux/store';
import { LINE_HEIGHT_PX, getTagDetails, tags } from './day-form.utils';
import { DaysService } from 'src/data/api-client/services/DaysService';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { TooltipProvider } from 'src/components/ui/tooltip';
import EntryInput from './entry-input/entry-input.component';
import { Input } from 'src/components/ui/input';

import style from './day-form.module.scss';
import StyleUtils from 'src/utils/style.utils';
const s = StyleUtils.styleMixer(style);

const emptyDay: Day = {
  date: new Date(),
  title: '',
  entries: [{ text: '', tag: undefined }],
};

export default function DayForm() {
  const currentMonth = useSelector((state: AppState) => state.journal.currentMonth);
  const [dayForm, setDayForm] = useState<Day>(emptyDay);

  useEffect(() => {
    if (currentMonth[0]) {
      const date = startOfDay(currentMonth[0].date);
      const today = startOfDay(new Date());
      if (today === date) setDayForm(currentMonth[0]);
      else setDayForm(emptyDay);
    } else {
      setDayForm(emptyDay);
    }
  }, []);

  useEffect(() => {
    if (dayForm.entries[dayForm.entries.length - 1].text) {
      let newEntries = [...dayForm.entries];
      newEntries.push({ text: '', tag: undefined });
      setDayForm((prevDayForm) => ({ ...prevDayForm, entries: newEntries }));
    }
  }, [dayForm]);

  return (
    <div className={s('container')}>
      <TooltipProvider>
        <Card className={s('card')}>
          <CardHeader>
            <CardTitle>Today</CardTitle>
            <CardDescription>Write your journal here...</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input id="title" placeholder="Title" />
                </div>

                <div className={s('entries')}>
                  {dayForm?.entries.map((entry, index) => {
                    const { Icon: SelectedTagIcon, color: tagColor, displayName } = getTagDetails(entry.tag);
                    return (
                      <EntryInput
                        tagColor={tagColor}
                        SelectedTagIcon={SelectedTagIcon}
                        displayName={displayName}
                        handleTagChange={(tag: Tag) => handleTagChange(tag, index)}
                        entry={entry}
                        handleTextFocus={(event: React.FocusEvent<HTMLTextAreaElement, Element>) => handleTextFocus(index, event)}
                        handleTextChange={(event: ChangeEvent<HTMLTextAreaElement>) => handleTextChange(index, event)}
                        handleTextBlur={(event: React.FocusEvent<HTMLTextAreaElement, Element>) => handleTextBlur(index, event)}
                      />
                    );
                  })}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </TooltipProvider>
      <button
        onClick={async () => {
          // TODO: Send Create
          console.log({ dayForm });
          const newEntries = dayForm.entries;
          newEntries.pop();
          const sendDayForm = { ...dayForm, entries: newEntries };

          // TODO: Remove last empty entry
          await DaysService.postApiV1Day(sendDayForm);
          // TODO: Send Update
        }}
      >
        Create
      </button>
    </div>
  );

  function handleTagChange(tag: Tag | undefined, index: number) {
    updateEntry({ ...dayForm.entries[index], tag }, index);
  }

  function handleTextFocus(index: number, { target }: React.FocusEvent<HTMLTextAreaElement>) {
    target.style.height = `${1}px`;
    const updatedText = target.value.replace(/[\s\n\t]+$/g, '');
    updateTargetEntry(target, index, updatedText, target.scrollHeight);
  }

  function handleTextBlur(index: number, { target }: React.FocusEvent<HTMLTextAreaElement>) {
    target.style.height = `${1}px`;
    let updatedHeight = target.scrollHeight;
    let updatedText = target.value;

    // Adjust height to last line
    if (updatedText.endsWith('\n')) {
      const numberNewLines = (updatedText.match(/\n+$/) ?? [])[0]?.length ?? 0;
      updatedHeight = updatedHeight - LINE_HEIGHT_PX * numberNewLines + 1;
    }

    updatedText = updatedText.replace(/[\s\n\t]+$/g, '');
    updateTargetEntry(target, index, updatedText, updatedHeight);
  }

  function handleTextChange(index: number, { target }: ChangeEvent<HTMLTextAreaElement>) {
    // Press 'Double Enter'
    if (target.value.endsWith('\n\n') && target.selectionStart === target.value.length) {
      target.blur(); // Triggers "handleTextBlur"
      return;
    }
    updateTargetEntry(target, index, target.value, target.scrollHeight);
  }

  function updateEntry(entry: Entry, index: number) {
    let newEntries = [...dayForm.entries];
    newEntries[index] = entry;
    setDayForm((prevDayForm) => ({ ...prevDayForm, entries: newEntries }));
  }

  function updateTargetEntry(target: EventTarget & HTMLTextAreaElement, index: number, text: string, heightPx: number) {
    updateEntry({ ...dayForm.entries[index], text }, index);
    target.style.height = `${heightPx}px`;
  }
}
