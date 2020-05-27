import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IEvent } from '../../../api/models';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.pug',
  styleUrls: ['./events-list.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsListComponent {
  @Input() events: Observable<IEvent[]>;
  @Output() delete = new EventEmitter<IEvent>();


  public trackById = (index, item: IEvent): any => item.eventId;

  public eventType = (event: IEvent): string => {
    return event.type;
  };

  public boolConverter = (param: boolean): string => {
    return param ? 'yes' : 'no';
  };

  public deleteEvent(event: IEvent) {
    this.delete.emit(event);
  }

  public edit(event: IEvent) {
    this.router.navigate([`/events/${event.eventId}/edit`]).then();
  }

  constructor(private router: Router) {
  }
}
