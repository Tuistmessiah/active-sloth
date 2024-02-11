import { LINE_HEIGHT_PX, getTagDetails, tags } from '../day-form.utils';

import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover';
import { Textarea } from 'src/components/ui/textarea';

import { ReactComponent as BanIcon } from 'src/assets/svgs/ban-fa.svg';

import style from './entry-input.module.scss';
import StyleUtils from 'src/utils/style.utils';
const s = StyleUtils.styleMixer(style);

export interface EntryInputProps {}

// TODO: Type these props
export default function EntryInput(props: any) {
  const { tagColor, SelectedTagIcon, displayName, handleTagChange, entry, handleTextFocus, handleTextChange, handleTextBlur } = props;
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
                {tags.map((tag) => {
                  const { Icon: TagIcon, color: tagColor, displayName } = getTagDetails(tag);
                  return (
                    <Tooltip>
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
              {/* <div className={s('options-tag')}>
                {tags.map((tag) => {
                  const { Icon: TagIcon, color: tagColor, displayName } = getTagDetails(tag);
                  return (
                    <Tooltip>
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
              </div> */}
            </PopoverContent>
          </div>
        </PopoverTrigger>
      </Popover>

      <Textarea
        value={entry.text}
        onFocus={(event) => handleTextFocus(event)}
        onChange={(event) => handleTextChange(event)}
        onBlur={(event) => handleTextBlur(event)}
        placeholder={'Enter your entry...'}
        style={{
          fontSize: `${LINE_HEIGHT_PX - 4}px`,
          lineHeight: `${LINE_HEIGHT_PX}px`,
          backgroundColor: tagColor,
        }}
      />
    </div>
  );
}
