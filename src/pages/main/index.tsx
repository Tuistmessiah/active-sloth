// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// import { AppState } from '../../data/interfaces/redux/redux.interface';

import s from './main.module.scss';

export interface MainProps {}

const defaultProps = {} as Required<MainProps>;

/**
 * DESCRIPTION
 */
export default function Main(props: MainProps) {
    const {} = { ...defaultProps, ...props };

    // const SOMETHING = useSelector((state: AppState) => state.session.SOMETHING);

    // const [STATE, SETSTATE] = useState();

    return <div className={s['wrapper']}></div>;
}
