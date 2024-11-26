export interface IAllAppointment {
  id:       number;
  date:     Date;
  user:     User;
  schedule: Schedule;
  status:   Status;
}

export interface Schedule {
  id:         number;
  day:        string;
  start_time: string;
}

export interface Status {
  id:   number;
  name: string;
}

export interface User {
  id:   number;
  name: string;
  last_name: string;
  code: string;
}
