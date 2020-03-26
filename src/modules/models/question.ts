import { OptionModel } from '.';

export interface IQuestion {
  id: number;
  index?: number;
  external_id: string;
  options: OptionModel.IOption[];
  text: string;
  first: boolean;
}
