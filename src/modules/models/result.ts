import { SymptomModel } from '.';

export enum Text {
  TEST = 'TEST',
  QUARENTINE = 'QUARENTINE',
}

export interface IResult {
  symptoms: SymptomModel.ISymptom[];
  name?: Text;
  option_id?: number;
  id: number;
}
