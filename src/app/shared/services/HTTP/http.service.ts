import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
      this.httpClient
        .request<IHttpResponse<T>>(method, url, {
          body,
        })
        .subscribe({
          next(value) {
            resolve(value);
          },
          error(err) {
            console.log(err);
            reject(err);
          },
        });
    });
  }
}
