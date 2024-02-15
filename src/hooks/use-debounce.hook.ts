import { MutableRefObject, useRef } from 'react';
import { useStateRef } from './use-state-ref.hook';

let timer: NodeJS.Timeout | null = null;

/** Debounce function for a TIME INTERVAL. Doesn't allow uncontrolled multiple calls.
 * @param chooseMode `start` and `end` (default) modes, run FIRST callback at start and end of time interval, respectively. Blocks further calls inside interval.
 * @param chooseMode `both` runs FIRST callback at start and SECOND call in the end. Blocks further calls inside interval.
 * @param chooseMode `run-last` and `refresh`, run the LAST call made during the interval, at the end of it. `refresh` resets timer at every call.
 * @example const fnExample = useDebounce(1000, 'run-last'); fnExample(() => { example('I run, at max, every second!') });
 * @description Saves inside a reference to the function and it will block new execution if not allowed by "chosenMode"
 */
export function useDebounce(msSeconds: number, chooseMode?: 'start' | 'end' | 'both' | 'run-last' | 'refresh'): (callback: () => void) => void {
  const mode = chooseMode || 'end';
  const [[, getIsBlocking], setIsBlocking] = useStateRef<boolean>(false);
  const [[, getCallbackQueued], setCallbackQueued] = useStateRef<boolean>(false);
  let callbackRef: MutableRefObject<(() => void) | undefined> = useRef(undefined);

  return function (callback: () => void) {
    if (!getIsBlocking()) {
      // Trigger/first call
      if (mode === 'start' || mode === 'both') callback();
      else if (mode === 'run-last' || mode === 'refresh') callbackRef.current = callback;
      setIsBlocking(true);
      timer = setTimeout(() => {
        if (mode === 'end') callback();
        else if (mode === 'run-last' || mode === 'refresh') callbackRef.current && callbackRef.current();
        else if (mode === 'both' && getCallbackQueued()) callback();
        resetTimer();
      }, msSeconds);
    } else {
      // During TIME INTERVAL / Multiple calls
      if (mode === 'both' && !getCallbackQueued()) setCallbackQueued(true);
      else if (mode === 'run-last') callbackRef.current = callback;
      else if (mode === 'refresh' && timer) {
        callbackRef.current = callback;
        clearTimeout(timer);
        timer = setTimeout(() => {
          callbackRef.current && callbackRef.current();
          resetTimer();
        }, msSeconds);
      }
    }
  };

  function resetTimer() {
    setCallbackQueued(false);
    setIsBlocking(false);
    callbackRef.current = undefined;
  }
}
