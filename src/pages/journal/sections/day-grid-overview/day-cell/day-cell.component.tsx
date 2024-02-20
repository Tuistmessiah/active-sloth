import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isSameDay } from 'date-fns';

import { AppState } from 'src/data/redux/store';
import { selectDay } from 'src/data/redux/reducers/journal.reducer';

import { ScrollArea } from 'src/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/ui/tooltip';
import EntryInput from '../../day-form/entry-input/entry-input.component';
import { DisplayDay } from '../day-grid-overview.container';

import { ReactComponent as ExpandMore } from 'src/assets/svgs/expand-more-svgrepo.svg';
import { ReactComponent as ExpandLessCircle } from 'src/assets/svgs/expand-less-circle-svgrepo.svg';

import style from './day-cell.module.scss';
import StyleUtils from 'src/utils/style.utils';
import { MiscUtils } from 'src/utils/misc.utils';
const s = StyleUtils.styleMixer(style);

export interface DayCellProps {
  day: DisplayDay;
}

export interface ClickIconProps {
  tooltip: string | (() => string);
  isToggled: boolean;
  toggle: (value: boolean) => void;
  icons: [JSX.Element, JSX.Element];
}

// TODO: Proper component
function ClickIcon(props: ClickIconProps) {
  const { tooltip, isToggled, toggle, icons } = props;
  return (
    <div className={s('container')}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div onClick={() => toggle(!isToggled)} className={s('click-icon', { fill: !isToggled })}>
            {isToggled ? icons[0] : icons[1]}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{MiscUtils.run(tooltip)}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export default function DayCell(props: DayCellProps) {
  const dispatch = useDispatch();
  const { day } = props;

  const selectedDay = useSelector((state: AppState) => state.journal.selectedDay);

  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandBtn, setShowExpandBtn] = useState(false);
  const cellRef = useRef<HTMLDivElement>(null);

  const date = new Date(day.date);

  // Check height
  useEffect(() => {
    if (cellRef.current) {
      const currentHeight = cellRef.current.clientHeight;
      setShowExpandBtn(currentHeight > 100);
      if (date.toISOString() === '2024-02-14T00:00:00.000Z') console.log('passou', date.toISOString());
    }
  });

  return (
    <div
      onClick={() => dispatch(selectDay({ date: day.date }))}
      className={s('container', { empty: !day.data, selected: isSameDay(date, new Date(selectedDay?.date ?? '')), today: isSameDay(date, new Date()) })}
    >
      <>
        <div className={s('day-date')}>
          <span>{date.getDate()}</span>
          <span>{day.data?.title ?? ''} </span>
          <span>{isSameDay(date, new Date()) ? ' - Today' : ''} </span>
          {showExpandBtn && <ClickIcon tooltip={'expand'} isToggled={isExpanded} toggle={(value) => setIsExpanded(value)} icons={[<ExpandLessCircle />, <ExpandMore />]} />}
        </div>
        <ScrollArea ref={cellRef}>
          <div className={s('day-card', { 'is-expanded': isExpanded })}>
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
}
