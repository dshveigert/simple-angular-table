import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { EventsService } from '../../services/events.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-new-event-page',
  templateUrl: './new-event-page.component.pug',
  styleUrls: ['./new-event-page.component.styl']
})
export class NewEventPageComponent {
  private _createSub: SubscriptionLike;

  public cancel(): void {
    this.router.navigate(['/events']).then();
  }

  public createEvent(event: any) {
    this._createSub = this.events.eventCreate(event).pipe(tap(() => {
      this.router.navigate(['/events']).then();
    })).subscribe();
  }

  constructor(public events: EventsService, private router: Router) { }
}
