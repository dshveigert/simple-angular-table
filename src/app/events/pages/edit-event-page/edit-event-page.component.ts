import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, SubscriptionLike } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { EventsService } from '../../services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent } from '../../../api/models';

@Component({
  selector: 'app-edit-event-page',
  templateUrl: './edit-event-page.component.pug',
  styleUrls: ['./edit-event-page.component.styl']
})
export class EditEventPageComponent implements OnInit, OnDestroy {
  private _routerSub: SubscriptionLike;
  private _editSub: SubscriptionLike;
  public eventId: number;

  get event(): Observable<IEvent> {
    return this.events.data$.pipe(map(eventsList => {
      return eventsList.find(item => item.eventId === this.eventId);
    }));
  }

  public cancel(): void {
    this.router.navigate(['/events']).then();
  }

  public eventUpdate(event: any) {
    this._editSub = this.events.eventUpdate(event).pipe(tap(() => {
      this.router.navigate(['/events']).then();
    })).subscribe();
  }

  ngOnInit() {
    this._routerSub = this.activated.params.pipe(tap(({eventId = ''}: {eventId: string}) => {
      if (eventId.length > 0) {
        this.events.init();
        this.eventId = Number(eventId);
      }
    })).subscribe();
  }

  ngOnDestroy() {
    this._routerSub.unsubscribe();
    this.events.destroy();
    this.eventId = null;
  }

  constructor(private activated: ActivatedRoute, private router: Router, public events: EventsService) {
  }

}
