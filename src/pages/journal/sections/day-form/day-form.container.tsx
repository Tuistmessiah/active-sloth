import { useEffect, useRef, useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card';
import { Input } from 'src/components/ui/input';
import { Textarea } from 'src/components/ui/textarea';

import style from './day-form.module.scss';
import StyleUtils from 'src/utils/style.utils';
const s = StyleUtils.styleMixer(style);

export function CardWithForm() {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

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
              <div className="flex flex-col space-y-1.5">
                <Textarea placeholder="A new entry..." onChange={handleChange} style={{ overflow: 'hidden' }} ref={textareaRef} />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  function handleChange(e: any) {
    const value = e.target.value;
    setText(value);
    if (value.endsWith('\n\n')) {
      (textareaRef.current as any).blur();
    }
  }
}
