import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timezoneOffset',
  standalone: true,
})
export class TimezoneOffsetPipe implements PipeTransform {
  transform(offsetInSeconds: number | null | undefined): string {
    if (offsetInSeconds == null) return '';

    const hours = offsetInSeconds / 3600;
    const sign = hours >= 0 ? '+' : '-';
    return `${sign}${Math.abs(hours)}`;
  }
}
