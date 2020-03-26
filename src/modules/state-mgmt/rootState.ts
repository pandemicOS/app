import { IState as IAuthState } from './auth/state';
import { IState as IUserState } from './user/state';
import { IState as IQuestionState } from './question/state';
import { ApiService } from '../services/ApiService';
import { NavigationService } from '../services/NavigationService';
import { HelperService } from '../services/HelperService';
import { Logger } from '../services/Logger';
import { AsyncStorageService } from '../services/AsyncStorageService';

export interface IAction {
  type: string;
  payload: any;
}

export interface IRootState {
  auth: IAuthState;
  user: IUserState;
  question: IQuestionState;
}

export interface IEpicDependencies {
  apiService: ApiService;
  asyncStorageService: AsyncStorageService;
  navigationService: NavigationService;
  helperService: typeof HelperService;
  logger: typeof Logger;
}
