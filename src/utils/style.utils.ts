import cx from 'classnames';

export default abstract class StyleUtils {
  /** className mixer ()
     * @example import style from './your.module.scss';
                import { StyleUtils } from '../../utils/style.utils';
                const s = StyleUtils.cx(style);
                ...
                <div className={s('container', { 'some-if': true })}>
     */
  static styleMixer(styles: Record<string, string>) {
    return (...args: (string | Record<string, boolean>)[]) => {
      return cx(
        ...args.map((arg) => {
          if (typeof arg === 'string') {
            return styles[arg];
          }
          if (typeof arg === 'object') {
            const newObj: Record<string, boolean> = {};
            for (const key in arg) {
              newObj[styles[key]] = arg[key];
            }
            return newObj;
          }
          return arg;
        })
      );
    };
  }

  /**
   * Operate on Hex color string. Can 'darken' | 'lighten' | 'more-color'
   * @param hex color in hexadecimal
   * @param factor 0-1, darken factor
   * @param type?: 'darken' | 'lighten' | 'more-color'
   */
  static changeHexColor(hex: string, factor: number, type?: 'darken' | 'lighten' | 'more-color'): string {
    const factorEffective = Math.max(0, Math.min(1, factor));
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    switch (type) {
      case 'more-color':
        const maxVal = Math.max(r, g, b);
        if (r === maxVal) r = Math.min(255, Math.round(r + (255 - r) * factor));
        if (g === maxVal) g = Math.min(255, Math.round(g + (255 - g) * factor));
        if (b === maxVal) b = Math.min(255, Math.round(b + (255 - b) * factor));
        const minAdjustmentFactor = 1 - factor * 0.2;
        if (r < maxVal) r = Math.round(r * minAdjustmentFactor);
        if (g < maxVal) g = Math.round(g * minAdjustmentFactor);
        if (b < maxVal) b = Math.round(b * minAdjustmentFactor);
        break;
      case 'lighten':
        r = Math.min(255, Math.round(r + (255 - r) * factor));
        g = Math.min(255, Math.round(g + (255 - g) * factor));
        b = Math.min(255, Math.round(b + (255 - b) * factor));
        break;
      case 'darken':
      default:
        r = Math.round(r * (1 - factorEffective));
        g = Math.round(g * (1 - factorEffective));
        b = Math.round(b * (1 - factorEffective));
    }

    const rHex = r.toString(16).padStart(2, '0');
    const gHex = g.toString(16).padStart(2, '0');
    const bHex = b.toString(16).padStart(2, '0');
    return `#${rHex}${gHex}${bHex}`;
  }
}
