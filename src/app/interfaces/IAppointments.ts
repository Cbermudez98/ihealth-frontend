export interface IAppointment {
  id:           number;
  description:  string;
  date:         Date;
  status:       Cause;
  cause:        Cause;
  reason:       Cause;
  psychologist: Psychologist;
  schedule:     Schedule;
}

export interface Cause {
  id:   number;
  name: string;
}

export interface Psychologist {
  id:        number;
  name:      string;
  last_name: string;
  age:       number;
  code:      string;
  gender:    string;
}

export interface Schedule {
  id:         number;
  day:        string;
  start_time: string;
  end_time:   string;
}
