import { ReactComponent as LoadingSvg } from 'src/assets/svgs/loading-svgrepo.svg';

import style from './loading-icon.module.scss';
import StyleUtils from 'src/utils/style.utils';
const s = StyleUtils.styleMixer(style);

/**
 * Rotating loading icon
 * @return svg element
 */
export default function LoadingIcon() {
  return <LoadingSvg className={s('container')} />;
}
