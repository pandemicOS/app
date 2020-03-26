import { PatientModel } from '../../../modules/models';

export interface IState {
  currentPatient: PatientModel.IPatient;
  isLoading: boolean;
  hasError: boolean;
}

export const initialState: IState = {
  currentPatient: null,
  isLoading: false,
  hasError: false
};
