// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// import { AppState } from '../../data/interfaces/redux/redux.interface';

import { Icon } from '../../components/icon/icon.component';

import SlothLogo from '../../assets/svgs/sloth-logo-1.svg';
// import { ReactComponent as slothLogo } from '../../assets/svgs/sloth-logo.svg';

import s from './navbar.module.scss';
import { IconAsset } from '../../components/icon-asset.component.tsx/icon-asset.component';

export interface NavbarProps {}

const defaultProps = {} as Required<NavbarProps>;

/**
 * DESCRIPTION
 */
export function Navbar(props: NavbarProps) {
    const {} = { ...defaultProps, ...props };

    // const SOMETHING = useSelector((state: AppState) => state.session.SOMETHING);

    // const [STATE, SETSTATE] = useState();
    return (
        <div className={s.wrapper}>
            <Icon icon={'coffee'} />
            <IconAsset Icon={SlothLogo} />
            <SlothLogo />
            <h2>Main Menu</h2>
            <div className={s['user-config']}>Dropdown</div>
        </div>
    );
}
