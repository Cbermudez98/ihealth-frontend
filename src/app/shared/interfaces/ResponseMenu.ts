export interface ResponseMenu {
  code: number;
  data: Route[];
  message: string;
  status: boolean;
  timestamp: string;
}

export interface Route {
  id: number;
  name: string;
  icon: string;
  route: string;
}