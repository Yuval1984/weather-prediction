import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sunTime',
  standalone: true
})
export class SunTimePipe implements PipeTransform {

  transform(unixSeconds: number, tzOffsetSeconds: number = 0): string {
    if (!unixSeconds) return '';
    const date = new Date((unixSeconds + tzOffsetSeconds) * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

}
