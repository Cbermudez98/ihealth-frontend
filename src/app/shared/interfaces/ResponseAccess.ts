export interface ResponseAccess {
  code: number;
  message: string;
  status: boolean;
  data: {
    access_token:string;
  };
}
