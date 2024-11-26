import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { IUser } from '../../../../../shared/interfaces/ResponseUser';
import { HttpService } from '../../../../../shared/services/HTTP/http.service';
import { environment } from '../../../../../environments/enviroments';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  users: IUser[] = [];
  loading: boolean = true;
  searchValue: string = '';

  constructor(private readonly httpService: HttpService) {}

  async ngOnInit() {
    const Url = environment.apiUrl;
    const getUsers = Url + 'user/all';

    const response = (await this.httpService.request<{ data: IUser[]; status: boolean }>(getUsers, 'GET')).data;
    if (response.status) {
      this.users = response.data;
    }
    console.log(response);
    this.loading = false;
  }

  clearFilters(table: Table) {
    table.clear();
  }

  applyGlobalFilter(event: Event, table: Table) {
    const input = event.target as HTMLInputElement;
    if (input && input.value !== null) {
      table.filterGlobal(input.value, 'contains');
    }
  }
}
