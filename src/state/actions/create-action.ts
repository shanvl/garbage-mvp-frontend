import { Action, ActionWithPayload } from './types';

export default function createAction<T extends string>(type: T): Action<T>;
export default function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export default function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type } : { type, payload };
}
