import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'milisToSeconds',
  standalone: true,
})
export class MilisToSecondsPipe implements PipeTransform {

  transform(value: number): string {
    if (value < 0) {
      return '0';
    }
    const seconds = Math.floor(value / 1000);
    const milliseconds = value % 1000;
    return `${seconds}.${milliseconds.toString().padStart(3, '0')}`;
  }

}
