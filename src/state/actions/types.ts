import { ActionCreatorsMapObject } from 'redux';

export interface Action<T extends string> {
  type: T;
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P;
}

export type ActionCreatorWithPayload<T extends string, U> = (payload: U) => ActionWithPayload<T, U>;
export type ActionCreator<T extends string> = () => Action<T>;

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;
