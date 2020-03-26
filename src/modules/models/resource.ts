export enum Type {
  INFO = 'info',
  PHONE = 'phone',
}

export interface IResource {
  name: string;
  target: string;
  resource_type: Type;
}
