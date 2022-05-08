import { MouseEvent } from 'react';

import { InlineStyle } from '../../types';

import style from './button-simple.module.scss';
import cx from 'classnames';

export interface ButtonSimpleProps {
    content: string | (() => JSX.Element);
    onClick: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
    adaptive?: boolean;
    customStyle?: InlineStyle;
}

const defaultProps = {} as Required<ButtonSimpleProps>;

/**
 * @param content Display content inside button
 * @param adaptive Trigger if button should expand
 */
export function ButtonSimple(props: ButtonSimpleProps) {
    const { content, onClick, adaptive, customStyle = {} } = { ...defaultProps, ...props };
    const display = typeof content === 'string' ? content : content();

    return (
        <button style={customStyle} className={cx(style.btn, { [style.adaptive]: adaptive })} onClick={(e) => onClick(e)}>
            {display}
        </button>
    );
}
