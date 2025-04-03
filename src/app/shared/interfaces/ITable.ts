export interface IColumns {
  field: string;
  header: string;
  type: 'Text' | 'Icon' | 'Number' | 'Array' | 'Date';
}

export interface IActions {
  update?: (row: any) => void;
  delete?: (row: any) => void;
  sort?: boolean;
  filter?: boolean;
}

export interface IHeaders {
  columns: IColumns[];
  actions?: IActions;
  data: Record<string, any>[];
}
