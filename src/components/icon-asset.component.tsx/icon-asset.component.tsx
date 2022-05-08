import { FC, FunctionComponentElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import s from './icon-asset.module.scss';

export interface IconAssetProps {
    /* Source: https://fontawesome.com/v4.7/icons/ */
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    rotation?: number;
}

const defaultProps = {} as Required<IconAssetProps>;

/**
 * @param icon Selector for a fontawesome icon
 * @param rotation Rotate the icon (º degrees)
 */
export function IconAsset(props: IconAssetProps) {
    const { Icon, rotation } = { ...defaultProps, ...props };

    return <Icon />;
}

const iconStyle = (rotation: Number) => ({ transform: `rotate(${rotation || 0}deg)` });
