import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import style from './test.module.scss';
import StyleUtils from 'src/utils/style.utils';
const s = StyleUtils.styleMixer(style);

export interface TestPageProps {}

export default function TestPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={s('container')}>
      <div className={s(`button ${isOpen ? 'open' : ''}`)} onClick={() => setIsOpen(!isOpen)}>
        <nav className={s(`nav ${isOpen ? 'show' : ''}`)}>
          <ul>
            <li>
              <a href="#0">
                <i className={s('ri-mic-line')}></i>
              </a>
            </li>
            <li>
              <a href="#0">
                <i className={s('ri-message-2-line')}></i>
              </a>
            </li>
            <li>
              <a href="#0">
                <i className={s('ri-file-line')}></i>
              </a>
            </li>
            <li>
              <a href="#0">
                <i className={s('ri-send-plane-2-line')}></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
