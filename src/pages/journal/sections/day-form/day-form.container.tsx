import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card';
import { Input } from 'src/components/ui/input';
import { Textarea } from 'src/components/ui/textarea';

import style from './day-form.module.scss';
import StyleUtils from 'src/utils/style.utils';
const s = StyleUtils.styleMixer(style);

const LINE_HEIGHT_PX = 19;

const initialEntries = [
  { text: 'First entry text', tag: 'work' },
  { text: 'Second entry text', tag: 'love' },
];

export function DayForm() {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);
  const [entries, setEntries] = useState([...initialEntries, { text: '', tag: '' }]);
  const lastTextAreaRef = useRef(null);

  /* Textarea input increases height with text line */
  useEffect(() => {
    if (textareaRef.current) {
      (textareaRef.current as any).style.height = 'inherit';
      (textareaRef.current as any).style.height = `${(textareaRef.current as any).scrollHeight}px`;
    }
  }, [text]);

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
                      onFocus={(event) => handleFocus(index, event)}
                      onChange={(event) => handleTextChange(index, event)}
                      onBlur={(event) => handleBlur(index, event)}
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

  function handleFocus(index: number, event: React.FocusEvent<HTMLTextAreaElement>) {
    const textAreaEl = event.target;
    let updatedText = textAreaEl.value;
    let newEntries = [...entries];

    updatedText = updatedText.replace(/[\s\n\t]+$/g, '');

    newEntries[index].text = updatedText;
    setEntries(newEntries);
    textAreaEl.style.height = `${1}px`;

    textAreaEl.style.height = `${textAreaEl.scrollHeight}px`;
  }

  function handleBlur(index: number, event: React.FocusEvent<HTMLTextAreaElement>) {
    event.target.style.height = `${1}px`;
    let updatedHeight = event.target.scrollHeight;
    let updatedText = event.target.value;
    let newEntries = [...entries];

    if (updatedText.endsWith('\n')) {
      updatedText = updatedText.slice(0, -1);
      updatedHeight = updatedHeight - LINE_HEIGHT_PX * 1 + 1;
    }

    updatedText = updatedText.replace(/[\s\n\t]+$/g, '');
    newEntries[index].text = updatedText;
    setEntries(newEntries);

    event.target.style.height = `${updatedHeight}px`;
  }

  function handleTextChange(index: number, event: ChangeEvent<HTMLTextAreaElement>) {
    let updatedText = event.target.value;
    let updatedHeight = event.target.scrollHeight;
    let newEntries = [...entries];

    // Double 'enter' - exit
    if (updatedText.endsWith('\n\n') && event.target.selectionStart === updatedText.length) {
      event.target.style.height = `${1}px`;
      updatedHeight = event.target.scrollHeight;

      updatedText = updatedText.replace(/[\s\n\t]+$/g, '');
      updatedHeight = updatedHeight - LINE_HEIGHT_PX * 2 + 1;
      event.target.blur();
    }

    newEntries[index].text = updatedText;
    setEntries(newEntries);
    event.target.style.height = `${updatedHeight}px`;
  }
}
