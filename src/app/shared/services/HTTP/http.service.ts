import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/enviroments';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface IHttpResponse<T> {
  status: boolean;
  message: string;
  data: T;
  timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  request<T>(
    url: string,
    method: Method,
    body?: Record<string, any>
  ): Promise<IHttpResponse<T>> {
    return new Promise((resolve, reject) => {
      // Obtener token del localStorage
      const token = localStorage.getItem('token');

      // Agregar headers con token si existe
      const headers = new HttpHeaders({
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      });

      this.httpClient
        .request<IHttpResponse<T>>(method, url, {
          body,
          headers, // <-- Aquí se agregan los headers
        })
        .subscribe({
          next(value) {
            resolve(value);
          },
          error(err) {
            console.error('Error HTTP:', err);
            reject(err);
          },
        });
    });
  }
}
