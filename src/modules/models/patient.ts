import { TestModel } from '.';

export enum Status {
  DANGER = 'danger',
  QUARANTINE = 'quarantine',
  SAFE = 'safe',
}

export interface IPatient {
  id?: string;
  email: string;
  fullname: string;
  phone: string;
  gender: string;
  age: number;
  lat?: string;
  lng?: string;
  updated_at?: string;
}
