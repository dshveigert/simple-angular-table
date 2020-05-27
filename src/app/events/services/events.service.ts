import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, SubscriptionLike } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { EventsApi } from '../../api/methods';
import { IEvent, IEventsList } from '../../api/models';

@Injectable({providedIn: 'root'})
export class EventsService {
  private _events: IEvent[] = [];
  private _events$: ReplaySubject<IEvent[]> = new ReplaySubject(1);
  private _eventsDataSub: SubscriptionLike;
  private _loading$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _total = 0;

  get data(): IEvent[] {
    return this._events;
  }

  get data$(): Observable<IEvent[]> {
    return this._events$;
  }

  get loading$(): Observable<boolean> {
    return this._loading$;
  }

  set loading(size: boolean) {
    this._loading$.next(size);
  }

  public init(): void {
    this._eventsDataSub = this.eventsData().subscribe();
  }

  public destroy(): void {
    this._eventsDataSub.unsubscribe();
  }

  public eventsData = (): Observable<IEventsList> => {
    if (this.data && this.data.length <= 0) {
      this.loading = true;
      return this.eventsApi.eventsList().pipe(tap(this.eventsDataEmit), finalize(() => this.loading = false));
    } else {
      return of({} as IEventsList);
    }
  };

  public eventDelete = (event: IEvent): Observable<any> => {
    this.loading = true;
    return this.eventsApi.deleteEvent(event.eventId).pipe(tap(() => {
      this.updateEvents(this._events.filter(item => item.eventId !== event.eventId));
    }), finalize(() => this.loading = false));
  }

  public eventCreate = (event: IEvent): Observable<IEvent> => {
    this.loading = true;
    return this.eventsApi.createEvent(event).pipe(tap((result: IEvent) => {
      this.updateTotal();
      const newEvent = {...result, eventId: this._total};
      let eventsList = this._events;
      eventsList.unshift(newEvent);
      this.updateEvents(eventsList);
    }), finalize(() => this.loading = false));
  };

  public eventUpdate = (event: IEvent): Observable<IEvent> => {
    this.loading = true;
    return this.eventsApi.updateEvent(event).pipe(tap((result: IEvent) => {
      const index = this._events.findIndex(item => item.eventId === result.eventId);
      this._events[index] = result;
      this.updateEvents(this._events);
    }), finalize(() => this.loading = false));
  };

  private updateTotal(): void {
    this._total++;
  }

  private eventsDataEmit = (data: IEventsList): void => {
    this._total = data.result[0].eventId;
    this.updateEvents(data.result);
  };

  private updateEvents(data: IEvent[]): void {
  this._events = data;
  this._events$.next(this._events);
}

  constructor(private eventsApi: EventsApi) {
  }
}
