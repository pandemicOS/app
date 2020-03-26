import { IUser } from './user';
import { ResourceModel, QuestionModel } from '.';

export interface ICredentialResponse {
  cred: string;
}

export interface IPagination<T> {
  count: number;
  page: number;
  limit: number;
  totalPages: number;
  docs: T[];
}

export interface IApiQuery {
  page: number;
  limit: number;
  q?: { [key: string]: any };
  sort?: { [key: string]: 'asc' | 'desc' };
  fields?: string;
  orFields?: string;

  [customQueryParam: string]: any;
}

export type ILoginResponse = IUser & { access_token?: string };

export type IGetPollResponse = QuestionModel.IQuestion[];

export type IGetResourcesResponse = ResourceModel.IResource[];

export interface IStoredAuth {
  userId: string;
  accessToken: string;
}
