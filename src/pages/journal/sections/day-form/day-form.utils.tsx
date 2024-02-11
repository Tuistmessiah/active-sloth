import { TagDetails } from 'src/data/interfaces/models.interface';
import { Tag } from 'src/data/interfaces/api.interface';

import { ReactComponent as BriefcaseIcon } from 'src/assets/svgs/briefcase-fa.svg';
import { ReactComponent as CoinsIcon } from 'src/assets/svgs/coins-fa.svg';
import { ReactComponent as HeartIcon } from 'src/assets/svgs/heart-fa.svg';
import { ReactComponent as PeopleRoofIcon } from 'src/assets/svgs/people-roof-fa.svg';
import { ReactComponent as PersonRunningIcon } from 'src/assets/svgs/person-running-fa.svg';
import { ReactComponent as RocketIcon } from 'src/assets/svgs/rocket-fa.svg';
import { ReactComponent as SpaIcon } from 'src/assets/svgs/spa-fa.svg';
import { ReactComponent as TableTennisPaddleBallIcon } from 'src/assets/svgs/table-tenis-paddle-ball-fa.svg';

/** Height in pixels (used for "entries" textarea) */
export const LINE_HEIGHT_PX = 16;

export const tags: Tag[] = ['work', 'finance', 'love', 'family', 'health', 'personal', 'wellbeing', 'hobbies'];

export function getTagDetails(tag?: Tag): TagDetails {
  switch (tag) {
    case 'work':
      return {
        Icon: <BriefcaseIcon />,
        color: '#f4f4fd',
        displayName: 'Work',
      };
    case 'finance':
      return { Icon: <CoinsIcon />, color: '#FEFEFD', displayName: 'Finance' };
    case 'love':
      return { Icon: <HeartIcon />, color: '#fdf2f3', displayName: 'Love' };
    case 'family':
      return {
        Icon: <PeopleRoofIcon />,
        color: '#FFF7F5',
        displayName: 'Family',
      };
    case 'health':
      return {
        Icon: <PersonRunningIcon />,
        color: '#F1FFF0',
        displayName: 'Health',
      };
    case 'personal':
      return {
        Icon: <RocketIcon />,
        color: '#F0FAFF',
        displayName: 'Personal Growth',
      };
    case 'wellbeing':
      return { Icon: <SpaIcon />, color: '#FFF9E6', displayName: 'Well-being' };
    case 'hobbies':
      return {
        Icon: <TableTennisPaddleBallIcon />,
        color: '#FAFAFA',
        displayName: 'Hobbies',
      };
    default:
      return { Icon: undefined, color: '#FFFFFF', displayName: '' };
  }
}
