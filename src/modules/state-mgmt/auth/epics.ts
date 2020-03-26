import { Epic, ofType } from 'redux-observable';
import { of, concat, merge } from 'rxjs';
import { catchError, mergeMap, switchMap, map, tap } from 'rxjs/operators';

import { GeneralModel, PatientModel } from '../../models';
import { IAction, IRootState, IEpicDependencies } from '../rootState';
import { coreState } from '../core';
import { questionState } from '../question';
import { actions, ActionType } from './actions';
import { ENV } from '../../../constants';

export const authGetEpicAuthStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.START),
    mergeMap(action =>
      concat(
        of(actions.setLoading(true)),
        of(action).pipe(
          switchMap(({ payload }) => deps.apiService.getPoll()),
          switchMap((res: GeneralModel.IGetPollResponse) => [questionState.actions.setQuestionList(res)]),
        ),
        of(action).pipe(
          switchMap(({ payload }) => deps.apiService.getResources()),
          switchMap((res: GeneralModel.IGetResourcesResponse) => [questionState.actions.setResourceList(res)]),
        ),
        of(actions.setLoading(false))
      ).pipe(catchError(() => of(actions.fail(), actions.setLoading(false))))
    )
  );

  export const authGetEpicCreatePatientStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SET_START_CREATE_PATIENT),
    mergeMap(action =>
      concat(
        of(actions.setLoading(true)),
        of(action).pipe(
          switchMap(({ payload }) => deps.apiService.createPatient(payload.patient)),
          tap((res: PatientModel.IPatient) => deps.asyncStorageService.setItem(ENV.STORAGE_KEY.PATIENT, res)),
          map((res: PatientModel.IPatient) => actions.setSuccessCreatePatient(res)),
          tap(() => {
            const questionList = state$.value.question.questionList;
            deps.navigationService.navigation.navigate('Questionnaire', { questionId: questionList.find(question => question.first).external_id });
          })
        ),
        of(actions.setLoading(false))
      ).pipe(catchError(() => of(actions.fail(), actions.setLoading(false))))
    )
  );

  export const authGetEpicGetPatientStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SET_START_GET_PATIENT),
    mergeMap(action =>
      concat(
        of(actions.setLoading(true)),
        of(action).pipe(
          switchMap(({ payload }) => deps.apiService.getPatient(payload.patientId)),
          tap((res: PatientModel.IPatient) => deps.asyncStorageService.setItem(ENV.STORAGE_KEY.PATIENT, res)),
          mergeMap((res: PatientModel.IPatient) => [actions.setSuccessCreatePatient(res), questionState.actions.setStartGetTest(res.id)]),
          tap(() => {
            deps.navigationService.navigation.navigate('Login');
          })
        ),
        of(actions.setLoading(false))
      ).pipe(catchError(() => of(actions.fail(), actions.setLoading(false))))
    )
  );

export const epics = [authGetEpicAuthStart, authGetEpicCreatePatientStart, authGetEpicGetPatientStart];
