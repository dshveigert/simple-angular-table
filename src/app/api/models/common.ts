export interface IResponse<D> {
  result: D;
  offset: number;
  limit: number;
  total: number;
}

export const enum EDateFormat {
  full = 'M/DD/YYYY hh:mm A',
  date_only = 'M/DD/YYYY',
  time_only = 'hh:mm A'
}
