import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { EDateFormat } from '../api/models';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(dateRow: number | string | Date, format: string = EDateFormat.full): string {
    const date: Moment = typeof dateRow === 'number' ? moment(dateRow, 'X') : moment(dateRow);
    return date.format(format);
  }

}
