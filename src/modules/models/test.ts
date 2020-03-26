export enum Status {
  QUARANTINE = 'quarantine',
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
}

export interface ITest {
  id: string;
  state: Status;
  result: boolean;
}
