import { Epic, ofType } from 'redux-observable';
import { of, concat } from 'rxjs';
import { mergeMap, map, tap, switchMap, catchError } from 'rxjs/operators';

import { IAction, IRootState, IEpicDependencies } from '../rootState';
import { actions, ActionType } from './actions';
import { OptionModel, ResultModel, TestModel } from '../../../modules/models';

export const questionGetEpicSetAnswer: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.START_SET_ANSWER),
    mergeMap(action =>
      of(action).pipe(
        map(({ payload }) => {
          const selectedOption: OptionModel.IOption = payload.question.options[payload.optionIndex];
          return actions.successSetAnswer({ question_external_id: payload.question.external_id, option: selectedOption });
        }),
        tap(({ payload }) => {
          const selectedOption: OptionModel.IOption = payload.selectedOption.option;
          const currentCollectedWarningList = state$.value.question.answerList.map(answer => answer.option.symptom_id).filter(symptom => symptom !== undefined && symptom !== null); // tslint:disable-line
          const collectedWarningList = selectedOption.symptom_id ? [...currentCollectedWarningList, selectedOption.symptom_id] : currentCollectedWarningList; // tslint:disable-line
          if (selectedOption.results) {
            const resultList = selectedOption.results.sort((a, b) => {
              if (a.symptoms.length > b.symptoms.length) {
                return -1;
              } else if (a.symptoms.length < b.symptoms.length) {
                return 1;
              }
              return 0;
            });
            for (const result of resultList) {
              const resultCondition = result.symptoms.every(symptom => collectedWarningList.includes(symptom.id));
              if (resultCondition) {
                console.log('reulst condition true');
                if (result.name === ResultModel.Text.QUARENTINE) {
                  deps.navigationService.navigation.navigate('Quarantine');
                  return;
                } else if (result.name === ResultModel.Text.TEST) {
                  deps.navigationService.navigation.navigate('NeedTest');
                  return;
                }
              }
            }
          }
          const nextQuestion = selectedOption.next_question_external_id ? state$.value.question.questionList.find(item => item.external_id === selectedOption.next_question_external_id) : undefined; // tslint:disable-line
          if (nextQuestion && selectedOption.next_question_external_id) {
            deps.navigationService.navigation.navigate({
              routeName: 'Questionnaire',
              params: { questionId: nextQuestion.external_id },
              key: nextQuestion.external_id
            });
          } else if (selectedOption.next_question_external_id) {
            console.log('NEXT QUESTION NOT FOUND!');
            deps.navigationService.navigation.navigate('NoPandemic');
          } else {
            console.log('QUESTIONNAIRE FINISHED!');
            deps.navigationService.navigation.navigate('NoPandemic');
          }
        }),
      )
    )
  );

  export const questionGetEpicSendAnswersStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.RESET),
    mergeMap(action =>
      concat(
        of(actions.setLoading(true)),
        of(action).pipe(
          switchMap(() => deps.apiService.sendAnswers({ called_for_help: false, lat: action.payload.lat || '', long: action.payload.long || '', patient_id: state$.value.auth.currentPatient.id, result: action.payload.result, state: action.payload.state, answers: action.payload.answers } as any)), // tslint:disable-line
          map((res: TestModel.ITest) => actions.finishReset(res))
        ),
        of(actions.setLoading(false))
      ).pipe(catchError(() => of(actions.fail(), actions.setLoading(false))))
    )
  );

  export const questionGetEpicGetTestsStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SET_START_GET_TEST),
    mergeMap(action =>
      concat(
        of(actions.setLoading(true)),
        of(action).pipe(
          switchMap(() => deps.apiService.getTests(action.payload.patientId)), // tslint:disable-line
          map((res: TestModel.ITest[]) => actions.setSuccessGetTest(res))
        ),
        of(actions.setLoading(false))
      ).pipe(catchError(() => of(actions.fail(), actions.setLoading(false))))
    )
  );

export const epics = [questionGetEpicSetAnswer, questionGetEpicSendAnswersStart, questionGetEpicGetTestsStart];
