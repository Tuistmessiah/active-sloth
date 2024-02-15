import { AppState, state } from 'src/data/redux/store';

/**
 * No render useSelector: Works as a convencional "useSelector" hook but doesn't trigger a rerender
 * @param selector same selector used by useSelector
 * @returns result of useSelector but as a getter() function
 */
export function useSelectorNR<TSelected = unknown>(selector: (state: AppState) => TSelected): () => TSelected {
  return () => selector(state());
}
