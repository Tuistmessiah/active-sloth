import { ChangeEvent, useEffect, useLayoutEffect, useRef } from 'react';
import { LINE_HEIGHT_PX, getTagDetails, tags } from '../day-form.utils';

import { Tag } from 'src/data/interfaces/api.interface';
import { Entry } from 'src/data/interfaces/models.interface';

import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover';
import { Textarea } from 'src/components/ui/textarea';

import { ReactComponent as BanIcon } from 'src/assets/svgs/ban-fa.svg';

import style from './entry-input.module.scss';
import StyleUtils from 'src/utils/style.utils';
const s = StyleUtils.styleMixer(style);

export interface EntryInputProps {
  entry: Entry;
  update?: (entry: Entry) => void;
  onChange?: () => void;
  onBlur?: () => void;
  displayOptions?: {
    /** Input is not editable & minor display changes occur */
    displayOnly?: boolean;
  };
}

/**
 * Input for a Day Entry, with tag menu selection
 */
export default function EntryInput(props: EntryInputProps) {
  const { entry, update, onChange, onBlur, displayOptions } = props;
  const { displayOnly } = displayOptions ?? {};
  const { Icon: SelectedTagIcon, color: tagColor, displayName } = getTagDetails(entry.tag);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (textAreaRef.current) {
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [entry.text]);

  return (
    <div className={s('container')} style={{ backgroundColor: tagColor }}>
      <Popover>
        <PopoverTrigger asChild>
          <div className={s('tag-menu')} style={{ backgroundColor: tagColor }}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>{SelectedTagIcon}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{displayName}</p>
              </TooltipContent>
            </Tooltip>
            <PopoverContent side="right">
              <div className={s('options-tag')}>
                {tags.map((tag, index) => {
                  const { Icon: TagIcon, color: tagColor, displayName } = getTagDetails(tag);
                  return (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <span style={{ backgroundColor: StyleUtils.changeHexColor(tagColor, 0.5, 'more-color') }} onClick={() => handleTagChange(tag)}>
                          {TagIcon}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{displayName}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
                <span onClick={() => handleTagChange(undefined)}>
                  <BanIcon />
                </span>
              </div>
            </PopoverContent>
          </div>
        </PopoverTrigger>
      </Popover>

      <Textarea
        ref={textAreaRef}
        value={entry.text}
        onFocus={(event) => !displayOnly && handleTextFocus(event)}
        onChange={(event) => !displayOnly && handleTextChange(event)}
        onBlur={(event) => !displayOnly && handleTextBlur(event)}
        placeholder={'Enter your entry...'}
        style={{
          fontSize: `${LINE_HEIGHT_PX - 4}px`,
          lineHeight: `${LINE_HEIGHT_PX}px`,
          backgroundColor: tagColor,
          resize: 'none',
          height: '36px',
        }}
        readOnly={displayOnly}
      />
    </div>
  );

  function handleTagChange(tag: Tag | undefined) {
    if (update) update({ ...entry, tag });
  }

  function handleTextFocus({ target }: React.FocusEvent<HTMLTextAreaElement>) {
    target.style.height = `${1}px`;
    const updatedText = target.value.replace(/[\s\n\t]+$/g, '');
    updateTargetEntry(target, updatedText, target.scrollHeight);
  }

  function handleTextBlur({ target }: React.FocusEvent<HTMLTextAreaElement>) {
    target.style.height = `${1}px`;
    let updatedHeight = target.scrollHeight;
    let updatedText = target.value;

    // Adjust height to last line
    if (updatedText.endsWith('\n')) {
      const numberNewLines = (updatedText.match(/\n+$/) ?? [])[0]?.length ?? 0;
      updatedHeight = updatedHeight - LINE_HEIGHT_PX * numberNewLines + 1;
    }

    updatedText = updatedText.replace(/[\s\n\t]+$/g, '');
    updateTargetEntry(target, updatedText, updatedHeight);
    if (onBlur) onBlur();
  }

  function handleTextChange({ target }: ChangeEvent<HTMLTextAreaElement>) {
    // Press 'Double Enter'
    if (target.value.endsWith('\n\n') && target.selectionStart === target.value.length) {
      target.blur(); // Triggers "handleTextBlur"
      return;
    }
    if (onChange) onChange();
    updateTargetEntry(target, target.value, target.scrollHeight);
  }

  function updateTargetEntry(target: EventTarget & HTMLTextAreaElement, text: string, heightPx: number) {
    if (update) update({ ...entry, text });
    target.style.height = `${heightPx}px`;
  }
}
