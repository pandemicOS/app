import { ActionType } from './actions';
import { initialState, IState } from './state';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload: any }): IState => {
  switch (type) {
    case ActionType.SET_SUCCESS_CREATE_PATIENT:
      return { ...state, currentPatient: payload.patient, hasError: false };
    case ActionType.SET_LOADING:
      return { ...state, isLoading: payload.isLoading };
    case ActionType.FAIL:
      return { ...state, hasError: payload.hasError };
    default:
      return state;
  }
};
