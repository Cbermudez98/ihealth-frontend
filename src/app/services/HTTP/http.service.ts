import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient);
  private baseUrl: string = environment.apiUrl; 

  constructor(private httpS: HttpClient) {}

  request<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    body?: any,
    headers?: HttpHeaders
  ): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.request<T>(method, url, {
      body,
      headers,
    });
  }
}
