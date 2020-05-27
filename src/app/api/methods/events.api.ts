import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { IEvent, IEventsList } from '../models';

@Injectable()
export class EventsApi {

  public eventsList(): Observable<IEventsList> {
    return this.api.get('/events');
  }

  public deleteEvent(eventId: number): Observable<any> {
    return this.api.delete(`/events/delete`, {id: eventId});
  }

  public createEvent(event: IEvent): Observable<IEvent> {
    return this.api.post(`/events/create`, {params: event});
  }

  public updateEvent(event: IEvent): Observable<IEvent> {
    return this.api.put(`/events/update`, {params: event});
  }

  constructor(private api: ApiService) {
  }
}
