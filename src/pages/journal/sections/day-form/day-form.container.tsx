import { ChangeEvent, useRef, useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card';
import { Input } from 'src/components/ui/input';
import { Textarea } from 'src/components/ui/textarea';

import style from './day-form.module.scss';
import StyleUtils from 'src/utils/style.utils';
const s = StyleUtils.styleMixer(style);

/** Height in pixels (used for "entries" textarea) */
const LINE_HEIGHT_PX = 19;

const initialEntries = [
  { text: 'First entry text', tag: 'work' },
  { text: 'Second entry text', tag: 'love' },
];

export function DayForm() {
  const [entries, setEntries] = useState([...initialEntries, { text: '', tag: '' }]);
  const lastTextAreaRef = useRef(null);

  return (
    <div className={s('container')}>
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
                {entries.map((entry, index) => (
                  <div className={s('entry')}>
                    <Textarea
                      key={index}
                      ref={index === entries.length - 1 ? lastTextAreaRef : null}
                      value={entry.text}
                      onFocus={(event) => handleTextFocus(index, event)}
                      onChange={(event) => handleTextChange(index, event)}
                      onBlur={(event) => handleTextBlur(index, event)}
                      placeholder={index === entries.length - 1 ? 'Enter your entry...' : ''}
                      style={{ fontSize: `${LINE_HEIGHT_PX - 4}px`, lineHeight: `${LINE_HEIGHT_PX}px` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );

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

  function updateTargetEntry(target: EventTarget & HTMLTextAreaElement, index: number, text: string, heightPx: number) {
    let newEntries = [...entries];
    newEntries[index].text = text;
    setEntries(newEntries);
    target.style.height = `${heightPx}px`;
  }
}
