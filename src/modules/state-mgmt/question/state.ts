import { UserModel, QuestionModel, OptionModel, ResourceModel, TestModel } from '../../models';
import { IEntityMap } from '../../../types';

export interface IState {
  isLoading: boolean;
  questionList: QuestionModel.IQuestion[];
  answerList: { question_external_id: string; option: OptionModel.IOption }[];
  warningList: string[];
  collectedWarningList: number[];
  resourceList: ResourceModel.IResource[];
  testList: TestModel.ITest[];
}

export const initialState = {
  isLoading: false,
  questionList: [],
  answerList: [],
  warningList: [],
  collectedWarningList: [],
  resourceList: [],
  testList: [],
};
