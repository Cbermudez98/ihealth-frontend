export interface IColumns {
  field: string;
  header: string;
  type: 'Text' | 'Icon' | 'Number' | 'Array' | 'Date';
  format?: (value: any) => string;
}

export interface IActions {
  update?: (row: any) => void | Promise<void>;
  delete?: (row: any) => void | Promise<void>;
  sort?: boolean;
  filter?: boolean;
}

export interface IHeaders {
  columns: IColumns[];
  actions?: IActions;
  data: Record<string, any>[];
}
