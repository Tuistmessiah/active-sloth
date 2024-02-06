import { useEffect, useRef, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";

import style from "./day-grid-overview.module.scss";
import StyleUtils from "src/utils/style.utils";
import { DaysService } from "src/data/api-client";
const s = StyleUtils.styleMixer(style);

// TODO: move these centrally
export interface Entry {
  text: string;
  tag: string;
}

export interface Day {
  date: string;
  entries: Entry[];
  title: string;
  userFK: string;
}

const dummyDataEntries: Entry[] = [
  {
    text: "Some text bla bla bla bla bla ahahaha",
    tag: "love",
  },
  {
    text: "Some text bla bla bla bla bla ahahaha. this is a long one nlkasd asdklasjdlk ajsdk lasjdlk asjdlk asj ldasj ladsj askdl jaskd lasj klsa jaskl jask lajsk lasd . \n And here it goes malsdjkal jsdklash aklsd naklsdj alsjd kl;asjfklah lfkasjdl; jaskld haskljd klasj dklashdkassa dkldsj kladhskjasdkl asbdkjavsbldhas lkagds kajksldjhaskgdalsdasndkaldm,.a sdklas jdklas jdalksn dlsak kjal s. \n Ok, jsut last one, short: asjldkasjdkl amsdklasj k;adsj alsdjk alsdjlas.",
    tag: "work",
  },
  {
    text: "Some text bla bla bla bla bla ahahaha. this is a long one nlkasd asdklasjdlk ajsdk lasjdlk asjdlk asj ldasj ladsj askdl jaskd lasj klsa jaskl jask lajsk lasd . \n And here it goes malsdjkal jsdklash aklsd naklsdj alsjd kl;asjfklah lfkasjdl; jaskld haskljd klasj dklashdkassa dkldsj kladhskjasdkl asbdkjavsbldhas lkagds kajksldjhaskgdalsdasndkaldm,.a sdklas jdklas jdalksn dlsak kjal s. \n Ok, jsut last one, short: asjldkasjdkl amsdklasj k;adsj alsdjk alsdjlas.",
    tag: "love",
  },
  {
    text: "Some text bla bla bla bla bla ahahaha. this is a long one nlkasd asdklasjdlk ajsdk lasjdlk asjdlk asj ldasj ladsj askdl jaskd lasj klsa jaskl jask lajsk lasd . \n And here it goes malsdjkal jsdklash aklsd naklsdj alsjd kl;asjfklah lfkasjdl; jaskld haskljd klasj dklashdkassa dkldsj kladhskjasdkl asbdkjavsbldhas lkagds kajksldjhaskgdalsdasndkaldm,.a sdklas jdklas jdalksn dlsak kjal s. \n Ok, jsut last one, short: asjldkasjdkl amsdklasj k;adsj alsdjk alsdjlas.",
    tag: "love",
  },
  {
    text: "Some text bla bla bla bla bla ahahaha",
    tag: "health",
  },
  {
    text: "Some text bla bla bla bla bla ahahaha",
    tag: "spiritual",
  },
];

const dummyDataDays: Day[] = [
  {
    date: "2024-02-01T23:00:00.000Z",
    entries: dummyDataEntries,
    title: "A day here ahah",
    userFK: "idwhatever",
  },
  {
    date: "2024-02-08T23:00:00.000Z",
    entries: dummyDataEntries,
    title: "A day here ahah",
    userFK: "idwhatever",
  },
  {
    date: "2024-02-03T23:00:00.000Z",
    entries: dummyDataEntries,
    title: "A day here ahah",
    userFK: "idwhatever",
  },
  {
    date: "2024-02-04T23:00:00.000Z",
    entries: dummyDataEntries,
    title: "A day here ahah",
    userFK: "idwhatever",
  },
  {
    date: "2024-02-10T23:00:00.000Z",
    entries: dummyDataEntries,
    title: "A day here ahah",
    userFK: "idwhatever",
  },
];

/** For only a month (max 31)
 * List from DB of days | sorted (should aleady be sorted) - should be in memory in redux and fetched on start only
 * List to display <- list from DB + empty days - should be in memory in redux and fetched on start only
 * Editing a day should only rerender inside the cell (each day has its own small component & css grids adjusts automatically)
 * On 'creating a day' send request to DB and update locally (in cell component) to avoid rerenders
 * On 'editing a day' send request to DB and update locally (in cell component) (What if user updates on side container, we need to find cell component with index???)
 */

// TODO: Have a list of updated days

const dummyDataDaysT = [...dummyDataDays];

export default function DayGridOverview() {
  const [days, setdays] = useState<Day[]>([]);

  useEffect(() => {
    DaysService.getApiV1DayCurrentMonth().then((res) => {});

    const sortedDays = sortDays(dummyDataDaysT);
    setdays(sortedDays);
  }, []);

  const filledDays = fillDays(days);

  return (
    <div className={s("container")}>
      <Card className={s("card")}>
        <CardHeader>
          <CardTitle>Today</CardTitle>
          <CardDescription>Write your journal here...</CardDescription>
        </CardHeader>

        <CardContent className={s("overview-wrapper")}>
          <div className={s("overview-main")}>
            {filledDays.map((day, i) => {
              const date = new Date(day.date);
              return (
                <div key={i} className={s("day-card", { empty: !day.data })}>
                  <div className={s("day-date")}>{date.toDateString()}</div>
                  {/* Existing day */}
                  {day.data &&
                    day.data?.entries.map((entry, ii) => (
                      <div key={ii} className={s("entry")}>
                        <span className={"tag"}>{entry.tag}:</span> {entry.text}
                      </div>
                    ))}
                  {/* Empty day */}
                  {!day.data && <></>}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function sortDays(days: Day[]): Day[] {
  return [...days].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

interface DisplayDay {
  date: string;
  data?: Omit<Day, "date">;
}

function fillDays(days: Day[]): DisplayDay[] {
  const today = new Date("2024-02-20T23:00:00.000Z");
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  let dayPointer = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
    23,
    0,
    0,
    0
  );
  const result: DisplayDay[] = [];

  let i = 0;
  while (dayPointer >= startOfMonth) {
    const dayString = dayPointer.toISOString();
    if (days[i] && dayString.startsWith(days[i].date.split("T")[0])) {
      const { date, ...data } = days[i];
      result.push({ date: dayString, data });
      i++;
    } else {
      result.push({ date: dayString });
    }
    dayPointer.setDate(dayPointer.getDate() - 1);
  }

  return result;
}
