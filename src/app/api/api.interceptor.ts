import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import * as events from './mocks/data.json';
import * as success from './mocks/response_success.json';

const urls = [
  {
    url: 'api/events',
    json: events
  },
  {
    url: 'api/events/delete',
    json: success
  },
  {
    url: 'api/events/create'
  },
  {
    url: 'api/events/update'
  }
];
const delayResponse = 1000;

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  private handleError = catchError<HttpEvent<any>, any>(error => {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        console.log('Error 401 example');
      }
    }
    return throwError(error);
  });

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    for (const element of urls) {
      if (request.url === element.url) {
        console.log('Request URL: ' + request.url);
        let result;
        switch(request.url) {
          case 'api/events/create':
            result = request.body.params;
            break;
          case 'api/events/update':
            result = request.body.params;
            break;
          default:
            result = ((element.json) as any).default;
        }
        return of(new HttpResponse({ status: 200, body: result })).pipe(delay(delayResponse));
      }
    }
    return next.handle(request).pipe(this.handleError);
  }

  constructor() {
  }
}
