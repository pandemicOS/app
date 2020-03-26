import { IState, initialState } from './state';
import { ActionType } from './actions';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload: any }) => {
  switch (type) {
    case ActionType.SET_QUESTION_LIST:
      return { ...state, questionList: payload.questionList };
    case ActionType.SET_RESOURCE_LIST:
      return { ...state, resourceList: payload.resourceList };
    case ActionType.SUCCESS_SET_ANSWER:
      return { ...state, answerList: [...state.answerList, payload.selectedOption] };
    case ActionType.FINISH_RESET:
      return { ...state, answerList: [], testList: [...state.testList, payload.test] };
    case ActionType.SET_SUCCESS_GET_TEST:
      return { ...state, testList: payload.testList };
    case ActionType.SET_LOADING:
      return { ...state, isLoading: payload.isLoading };
    case ActionType.FAIL:
      return { ...state, hasError: payload.hasError };
    default:
      return state;
  }
};
