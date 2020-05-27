import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-loader',
  templateUrl: './event-loader.component.html',
  styleUrls: ['./event-loader.component.styl']
})
export class EventLoaderComponent {
  @Input() loader: Observable<boolean>;

  constructor() { }
}
