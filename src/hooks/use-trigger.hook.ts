import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TriggerName, TriggerPayloadMap } from 'src/data/interfaces/redux.interface';

import { clearTrigger } from 'src/data/redux/reducers/session.reducer';
import { AppState } from 'src/data/redux/store';

/**
 * Hook that listens to trigger/events fired through redux. 
 * @param triggerName trigger name. Can attach custom data to trigger.
 * @param effect effect to run on the end side of the listener.
 * @example // How to send event/trigger:
 * dispatch(setTrigger({ name: 'trigger-1', content1: 'This is a notification message' }));
 * @example // How to call hook / receive event:
 * useTriggerEffect('trigger-1', (trigger) => {
      console.info(trigger.content1);
    });
 * @example // How to implement this code. Define redux state, actions and types:
    // * State
    triggers: {
      [K in TriggerPayload['name']]?: TriggerPayload;
    };
    // * Actions
    setTrigger: (state, action: PayloadAction<TriggerPayload>) => {
      const trigger = action.payload;
      state.triggers[trigger.name] = trigger;
    },
    clearTrigger: (state, action: PayloadAction<TriggerPayload['name']>) => {
      delete state.triggers[action.payload];
    },
    // * Types
    export type TriggerPayload = Trigger1 | Trigger2;
    interface Trigger1 {
      name: 'trigger-1';
      content1: string;
    }
    interface Trigger2 {
      name: 'trigger-2';
      contentThatIsDifferent: string;
      contentThatIsDifferent: boolean;
    }

    export type TriggerName = TriggerPayload['name'];
    export type TriggerPayloadMap = {
      [K in TriggerPayload['name']]: Extract<TriggerPayload, { name: K }>;
    };
 */
export const useTriggerEffect = <T extends TriggerName>(triggerName: T, effect: (trigger: TriggerPayloadMap[T]) => void) => {
  const dispatch = useDispatch();
  const trigger = useSelector((state: AppState) => state.session.triggers[triggerName]);

  useEffect(() => {
    if (trigger) {
      effect(trigger as TriggerPayloadMap[T]);
      dispatch(clearTrigger(triggerName));
    }
  }, [trigger, triggerName, effect, dispatch]);
};
