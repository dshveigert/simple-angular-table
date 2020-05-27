import { NgModule, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './api.interceptor';
import { ApiService } from './services/api.service';
import { EventsApi } from './methods';

const interceptor: Provider = {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true};
const api = [ApiService, EventsApi];

@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [HttpClientModule],
  providers: [interceptor, ...api],
})
export class ApiModule {
}
