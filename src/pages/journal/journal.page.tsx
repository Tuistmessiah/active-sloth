import DayForm from "./sections/day-form/day-form.container";
import DayGridOverview from "./sections/day-grid-overview/day-grid-overview.container";

import StyleUtils from "src/utils/style.utils";
import style from "./journal.module.scss";
const s = StyleUtils.styleMixer(style);

export default function JournalPage() {
  return (
    <div className={s("container")}>
      <div className={s("side-content")}>
        <DayForm />
      </div>
      <div className={s("main-content")}>
        <DayGridOverview />
      </div>
    </div>
  );
}
