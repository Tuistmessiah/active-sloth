import { DayForm } from './sections/day-form/day-form.container';

import StyleUtils from 'src/utils/style.utils';
import style from './journal.module.scss';
const s = StyleUtils.styleMixer(style);

export function JournalPage() {
  return (
    <div className={s('container')}>
      <div className={s('side-content')}>
        <DayForm />
      </div>
      <div className={s('main-content')}></div>
    </div>
  );
}
