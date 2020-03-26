import { PatientModel } from '../../../modules/models';

export enum ActionType {
  START = '[auth] start',
  SUCCESS = '[auth] success',
  SET_LOADING = '[auth] loading',
  FAIL = '[auth] fail',
  SET_START_CREATE_PATIENT = '[auth] set start create patient',
  SET_START_GET_PATIENT = '[auth] set start get patient',
  SET_SUCCESS_CREATE_PATIENT = '[auth] set success create patient',
  RECOVER_SESSION = '[auth] recover previous session and trigger bootstraping',
}

export const actions = {
  recoverSession: () => ({ type: ActionType.RECOVER_SESSION, payload: {} }),
  start: (email: string, password: string) => ({ type: ActionType.START, payload: { email, password } }),
  success: (currentUserId: string) => ({ type: ActionType.SUCCESS, payload: { currentUserId } }),
  setLoading: (isLoading: boolean) => ({ type: ActionType.SET_LOADING, payload: { isLoading } }),
  fail: () => ({ type: ActionType.FAIL, payload: { hasError: true } }),
  setStartCreatePatient: (patient: { fullname: string; age: number; email: string; gender: string; phone: string }) => ({ type: ActionType.SET_START_CREATE_PATIENT, payload: { patient } }),  // tslint:disable-line
  setSuccessCreatePatient: (patient: PatientModel.IPatient) => ({ type: ActionType.SET_SUCCESS_CREATE_PATIENT, payload: { patient } }),  // tslint:disable-line
  setStartGetPatient: (patientId: string) => ({ type: ActionType.SET_START_GET_PATIENT, payload: { patientId } }),  // tslint:disable-line
};
