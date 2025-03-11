// career.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/enviroments';

export interface Career {
  id: string;
  name: string;
}

interface ApiResponse {
  code: number;
  data: Career[];
  message: string;
  status: boolean;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class apiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCareers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/career`);
  }
}
