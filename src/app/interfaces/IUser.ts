export interface IUser {
  id: number;
  name: string;
  last_name: string;
  age: number;
  code: string;
  gender: string;
  role: Role;
  student_detail: StudentDetail;
  direction: Direction;
  auth: Auth;
}

export interface Auth {
  id: number;
  email: string;
  password?: string;
}

export interface Direction {
  id: number;
  neighborhood: string;
  street: string;
  number: string;
  aditional_information: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface StudentDetail {
  id: number;
  semester: number;
  career: Role;
}

export interface IUserStorage {
  id: number;
  name: string;
  last_name: string;
  role: string;
}
