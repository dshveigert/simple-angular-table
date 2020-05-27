import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { IEvent } from '../../../api/models';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.styl']
})
export class EventsPageComponent implements OnInit, OnDestroy {
  private _seleteSub: SubscriptionLike;

  public delete(event: IEvent): void {
    this._seleteSub = this.events.eventDelete(event).subscribe();
  }

  ngOnInit(): void {
    this.events.init();
  }
  ngOnDestroy(): void {
    this.events.destroy();
  }

  constructor(public events: EventsService) { }
}
