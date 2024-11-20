export interface User {
  name: string;
  last_name: string;
  age: number;
  code: number;
  gender: string;
  auth: {
    email: string;
    password: string;
  };
  direction: {
    neighborhood: string;
    street: string;
    number: string;
    aditional_information: string;
  };
  student_detail: {
    career: {
      id: number;
    };
    semester: number;
  };
  role: {
    id: number;
  };
}
