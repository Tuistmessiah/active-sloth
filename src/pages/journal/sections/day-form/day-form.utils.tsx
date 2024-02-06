import { ReactComponent as BriefcaseIcon } from "src/assets/svgs/briefcase-fa.svg";
import { ReactComponent as CoinsIcon } from "src/assets/svgs/coins-fa.svg";
import { ReactComponent as HeartIcon } from "src/assets/svgs/heart-fa.svg";
import { ReactComponent as PeopleRoofIcon } from "src/assets/svgs/people-roof-fa.svg";
import { ReactComponent as PersonRunningIcon } from "src/assets/svgs/person-running-fa.svg";
import { ReactComponent as RocketIcon } from "src/assets/svgs/rocket-fa.svg";
import { ReactComponent as SpaIcon } from "src/assets/svgs/spa-fa.svg";
import { ReactComponent as TableTennisPaddleBallIcon } from "src/assets/svgs/table-tenis-paddle-ball-fa.svg";

export type Tag =
  | "work"
  | "finance"
  | "love"
  | "family"
  | "health"
  | "personal"
  | "wellbeing"
  | "hobbies";

export function TagIcon(props: { tag?: Tag }) {
  switch (props.tag) {
    case "work":
      return <BriefcaseIcon />;
    case "finance":
      return <CoinsIcon />;
    case "love":
      return <HeartIcon />;
    case "family":
      return <PeopleRoofIcon />;
    case "health":
      return <PersonRunningIcon />;
    case "personal":
      return <RocketIcon />;
    case "wellbeing":
      return <SpaIcon />;
    case "hobbies":
      return <TableTennisPaddleBallIcon />;
    default:
      return null;
  }
}

export function tagColor(tag?: Tag) {
  switch (tag) {
    case "work":
      return "#f4f4fd"; // Very Light Lavender
    case "finance":
      return "#FEFEFD"; // Very Light LemonChiffon
    case "love":
      return "#fdf2f3"; // Very Light Pink
    case "family":
      return "#FFF7F5"; // Very Light Peach
    case "health":
      return "#F1FFF0"; // Very Light Green
    case "personal":
      return "#F0FAFF"; // Very Light Blue
    case "wellbeing":
      return "#FFF9E6"; // Very Light NavajoWhite
    case "hobbies":
      return "#FAFAFA"; // Almost White Grey
    default:
      return "#FFFFFF"; // White
  }
}
