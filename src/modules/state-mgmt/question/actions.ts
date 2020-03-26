import { QuestionModel, OptionModel, ResourceModel, PatientModel, TestModel } from '../../models';

export enum ActionType {
  SET_QUESTION_LIST = '[question] set question list',
  SET_RESOURCE_LIST = '[question] start set resource list',
  START_SET_ANSWER = '[question] start set answer',
  SUCCESS_SET_ANSWER = '[question] success set answer',
  RESET = '[question] reset',
  FINISH_RESET = '[question] finish reset',
  SET_LOADING = '[question] loading',
  FAIL = '[question] fail',
  SET_START_GET_TEST = '[question] set start get test',
  SET_SUCCESS_GET_TEST = '[question] set success get test',
}

export const actions = {
  setQuestionList: (questionList: QuestionModel.IQuestion[]) => ({ type: ActionType.SET_QUESTION_LIST, payload: { questionList } }), // tslint:disable-line
  setResourceList: (resourceList: ResourceModel.IResource[]) => ({ type: ActionType.SET_RESOURCE_LIST, payload: { resourceList } }),
  startSetAnswer: (question: QuestionModel.IQuestion, optionIndex: number) => ({ type: ActionType.START_SET_ANSWER, payload: { question, optionIndex } }),
  successSetAnswer: (selectedOption: { question_external_id: string; option: OptionModel.IOption }) => ({ type: ActionType.SUCCESS_SET_ANSWER, payload: { selectedOption } }), // tslint:disable-line
  reset: (lat: string, long: string, result: boolean, state: string, answers: { option_id: string }[]) => ({ type: ActionType.RESET, payload: { lat, long, result, state, answers } }), // tslint:disable-line
  finishReset: (test: TestModel.ITest) => ({ type: ActionType.FINISH_RESET, payload: { test } }),
  fail: () => ({ type: ActionType.FAIL, payload: { hasError: true } }),
  setLoading: (isLoading: boolean) => ({ type: ActionType.SET_LOADING, payload: { isLoading } }),
  setStartGetTest: (patientId: string) => ({ type: ActionType.SET_START_GET_TEST, payload: { patientId } }), // tslint:disable-line
  setSuccessGetTest: (testList: TestModel.ITest[]) => ({ type: ActionType.SET_SUCCESS_GET_TEST, payload: { testList } }), // tslint:disable-line
};
