import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcTime',
  standalone: true
})
export class UtcTimePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
