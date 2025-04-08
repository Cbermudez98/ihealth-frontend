import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../../shared/services/HTTP/http.service';
import { environment } from '../../../../../environments/enviroments';
import { IHeaders } from '../../../../../shared/interfaces/ITable'; 

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  headers: IHeaders = {
    columns: [
      { field: 'name', header: 'Nombre', type: 'Text' },
      { field: 'last_name', header: 'Apellido', type: 'Text' },
      { field: 'code', header: 'Codigo', type: 'Text' },
      { field: 'email', header: 'Email', type: 'Text' },
      { field: 'faculty', header: 'Facultad', type: 'Text' },
    ],
    data: [],
    actions: {
      sort: true,
      filter: true,
    }
  };

  
  loading: boolean = true;

  constructor(private readonly httpService: HttpService) {}

  async ngOnInit() {
    const Url = environment.apiUrl;
    const getUsers = Url + 'user/all';

    const response = (await this.httpService.request<any[]>(getUsers, 'GET')).data;
    console.log("🚀 ~ UserComponent ~ ngOnInit ~ response:", response);

    this.headers.data = response.map((resp) => ({
      name: resp.name,
      last_name: resp.last_name,
      code: resp.code.toString(),
      email: resp.auth.email,
      faculty: resp.student_detail.career.name,
    }));
    console.log("🚀 ~ Datos formateados para la tabla:", this.headers.data);
    this.loading = false;
  }

  onUpdate(user: any) {
    console.log("Actualizar usuario:", user);
  }

  onDelete(user: any) {
    console.log("Eliminar usuario:", user);
  }
}

