import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
  standalone: true
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, len: number): string {
    if (!value) return '';
    if (value.length > len) {
      return value.slice(0, len) + '...';
    } else {
      return value;
    }
  }

}
