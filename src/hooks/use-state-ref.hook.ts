import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from 'react';

/**
 * "useState" + "useRef" combination. Maintains useState reactivity without losing value reference
 * @obs can be used inside callbacks that lose reference (like event listeners)
 * @usage Use 'getState' inside event listeners to get current value of state ref
 * @param initialState initial state
 * @returns Offers both the normal "state" and a "getState", along with the "setState"
 */
export function useStateRef<T>(initialState: T): [[T, () => T], Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialState);
  const stateRef: MutableRefObject<T> = useRef(state);

  /** Sets the normal SetState and updates ref value too */
  function setStateRef(stateInput: any | T) {
    // Check if setState argument is a callback or data
    let newState = stateInput;
    if (typeof newState === 'function') newState = stateInput(stateRef.current);

    stateRef.current = newState;
    setState(newState);
  }

  function getState(): T {
    return stateRef.current;
  }

  return [[state, getState], setStateRef];
}
