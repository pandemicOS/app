import { ResultModel, SymptomModel } from '.';

export interface IOption {
  _id?: string;
  next_question_external_id?: string;
  index: number;
  question_id: number;
  text: string;
  results?: ResultModel.IResult[];
  symptom?: SymptomModel.ISymptom;
  symptom_id?: number;
}
