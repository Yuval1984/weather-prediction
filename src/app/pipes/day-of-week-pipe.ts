import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayOfWeek',
  standalone: true
})
export class DayOfWeekPipe implements PipeTransform {
  transform(value: string, locale: string = 'en-US'): string {
    if (!value) return '';

    // Expecting format: YYYY-MM-DD
    const date = new Date(value);
    if (isNaN(date.getTime())) return '';

    return date.toLocaleDateString(locale, { weekday: 'long' });
  }
}
