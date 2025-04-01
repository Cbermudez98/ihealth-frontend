export interface IRoute {
  id: number;
  name: string;
  icon: string;
  route: string;
  roles: { id: number, name?: string }[];
}

