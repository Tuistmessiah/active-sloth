import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp, library  } from '@fortawesome/fontawesome-svg-core';

import s from './icon.module.scss';

export interface IconProps {
    /* Source: https://fontawesome.com/v4.7/icons/ */
    icon: IconProp;
    rotation?: number;
}

const defaultProps = {} as Required<IconProps>;

/**
 * @param icon Selector for a fontawesome icon
 * @param rotation Rotate the icon (º degrees)
 *
 */
export function Icon(props: IconProps) {
    const { icon, rotation } = { ...defaultProps, ...props };

    return (
        <div>
            AA
            <FontAwesomeIcon icon={icon} className={s.icon} style={{ ...iconStyle(rotation || 0) }} />
        </div>
    );
}

const iconStyle = (rotation: Number) => ({ transform: `rotate(${rotation || 0}deg)` });
