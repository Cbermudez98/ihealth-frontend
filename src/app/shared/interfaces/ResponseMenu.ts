export interface ResponseMenu {
  code: number;
  message: string;
  status: boolean;
  data: [
    {
      id: number;
      icon: string;
      name: string;
      route: string;
    },
    {
      id: number;
      icon: string;
      name: string;
      route: string;
    },
    {
      id: number;
      icon: string;
      name: string;
      route: string;
    }
  ];
}
