import { Observable, throwError, of } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map, retryWhen, switchMap, take, delay, concat } from 'rxjs/operators';

import { ENV } from '../../constants';
import { GeneralModel, UserModel, ResourceModel, ResultModel, PatientModel, TestModel } from '../models';

export class ApiService {
  private http = ajax;
  private apiUrl: string = ENV.API.URL;
  private maxRetries: number = ENV.API.MAX_RETRIES;
  private retryTimeout: number = ENV.API.RETRY_TIMEOUT; /** @todo */
  private token: string = null;

  public setToken(token: string): void {
    this.token = token;
  }

  public getPoll(): Observable<GeneralModel.IGetPollResponse> {
    return this.request<GeneralModel.IGetPollResponse>('poll', { method: 'GET' });
  }

  public getResources(): Observable<GeneralModel.IGetResourcesResponse> {
    return this.request<GeneralModel.IGetResourcesResponse>('resources', { method: 'GET' });
  }

  public createPatient(patient: PatientModel.IPatient): Observable<PatientModel.IPatient> {
    return this.request<PatientModel.IPatient>('patients', { method: 'POST', body: patient });
  }

  public getPatient(patientId: string): Observable<PatientModel.IPatient> {
    return this.request<PatientModel.IPatient>(`patients/${patientId}`, { method: 'GET' });
  }

  public sendAnswers(test: { called_for_help: boolean; lat: string; long: string; patient_id: number; result: boolean; state: string; answers: { option_id: string }[] }): Observable<TestModel.ITest> { // tslint:disable-line
    return this.request<TestModel.ITest>(`tests`, { method: 'POST', body: test });
  }

  public getTests(patientId: number): Observable<TestModel.ITest[]> { // tslint:disable-line
    return this.request<TestModel.ITest[]>(`tests/?patient_id=${patientId}`, { method: 'GET' });
  }

  public login(body: { email: string; password: string }): Observable<GeneralModel.ILoginResponse> {
    // return this.request<GeneralModel.ILoginResponse>(`${ENV.API.ENTITY.AUTH}/parents/login`, { method: 'POST', body });
    return of({
      _id: '9164e4c4-6521-47bb-97fd-c75ac02b2cf5',
      email: body.email,
      name: 'John Doe',
      firstname: 'John',
      lastname: 'Doe',
      nickname: 'johndoe',
      avatar: 'https://lh4.googleusercontent.com/-WUY2PDwnKZk/AAAAAAAAAAI/AAAAAAAAAAc/1UMlOKImKRA/photo.jpg',
      picture: 'https://s.gravatar.com/avatar/8e5ef526703b1e38f75cba07ec2c3604?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fdg.png',
      gender: null,
      location: 'sf',
      role: 'general',
      lastOnline: new Date(),
      forcedStatus: UserModel.ForcedStatus.AVAILABLE,
      status: UserModel.Status.ONLINE,
      access_token: 'access-token',
      createdAt: new Date(),
      updatedAt: null
    }).pipe(delay(300));
  }

  public getUserList(idList: string[]): Observable<GeneralModel.IPagination<UserModel.IUser>> {
    // return this.request(ENV.API.ENTITY.USER, { method: 'GET', query: { q: { _id: idList }, page: 1, limit: 20 } });
    return of({
      count: 1,
      page: 1,
      limit: 1,
      totalPages: 1,
      docs: [
        {
          _id: idList[0],
          email: 'john@doe.com',
          name: 'John Doe',
          firstname: 'John',
          lastname: 'Doe',
          nickname: 'johndoe',
          avatar: 'https://lh4.googleusercontent.com/-WUY2PDwnKZk/AAAAAAAAAAI/AAAAAAAAAAc/1UMlOKImKRA/photo.jpg',
          picture: 'https://s.gravatar.com/avatar/8e5ef526703b1e38f75cba07ec2c3604?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fdg.png',
          gender: null,
          location: 'sf',
          role: 'general',
          lastOnline: new Date(),
          forcedStatus: UserModel.ForcedStatus.AVAILABLE,
          status: UserModel.Status.ONLINE,
          createdAt: new Date(),
          updatedAt: null
        }
      ]
    }).pipe(delay(300));
  }

  private request<T = any>(
    path: string,
    options: { method: string; body?: any; query?: GeneralModel.IApiQuery; headers?: { [key: string]: any } } = { method: 'GET' }
  ): Observable<T> {
    options.headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
    if (options.body) options.body = this.parseBody(options.body);
    if (this.token) options.headers['x-access-token'] = this.token;
    const requestOptions = { body: options.body, headers: options.headers, method: options.method };
    return this.http({ url: `${this.apiUrl}/${path}?${this.parseQuery(options.query)}`, ...requestOptions }).pipe(
      map(data => data.response as T),
      retryWhen((error: Observable<AjaxResponse>) =>
        error.pipe(
          switchMap((e: AjaxResponse) => {
            if (e.status !== 401) return of(e).pipe(delay(this.retryTimeout));
            else return throwError(e);
          }),
          take(this.maxRetries),
          concat(throwError(error))
        )
      )
    );
  }

  private parseQuery(query: GeneralModel.IApiQuery): string {
    try {
      return Object.keys(query)
        .map(key => `${key}=${query[key] && typeof query[key] === 'object' ? JSON.stringify(query[key]) : query[key]}`)
        .join('&');
    } catch {
      /* istanbul ignore next line */
      return '';
    }
  }

  private parseBody(body: { [key: string]: any }): string {
    try {
      return JSON.stringify(body);
    } catch {
      /* istanbul ignore next line */
      return '';
    }
  }
}
