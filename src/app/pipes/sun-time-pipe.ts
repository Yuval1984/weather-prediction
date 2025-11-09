import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sunTime',
  standalone: true,
})
export class sunTimePipe implements PipeTransform {
  transform(value: number | null | undefined, locale: string = 'en-IL'): string {
    if (!value) return '';
    const date = new Date(value * 1000); // Convert from seconds to ms
    return date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
