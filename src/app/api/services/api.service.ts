import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  public apiUrl = `api`;

  public get(url: string, options?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}${url}`, options);
  }

  public post(url: string, body?: any, options?: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${url}`, body, options);
  }

  public put(url: string, body: any, options?: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${url}`, body, options);
  }

  public delete(url: string, options?: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}${url}`, options);
  }

  constructor(private http: HttpClient) {
  }
}
