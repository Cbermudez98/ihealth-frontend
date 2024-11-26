export interface ResponseUser { 
  code: number,
  data: {
      id:number,
      name: string,
      last_name: string,
      age: number,
      code: number,
      gender: string,
      role: {
          id: number,
          name: string
      },
      student_detail: {
          id: number,
          semester: number,
          career: {
              id: number,
              name: string
          }
      },
    direction: {
          id: number,
          neighborhood: string,
          street: string,
          number: string,
          aditional_information: string,
      },
      auth: {
          id: number,
          email: string,
      }
  },

  message: string,
  status: boolean,
  timestamp: string
}

