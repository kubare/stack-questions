import { Pipe, PipeTransform } from '@angular/core';
import { Tags } from '../../enums/tags.enum';

@Pipe({
  name: 'tagColor',
})
export class TagColorPipe implements PipeTransform {
  transform(value: any) {
    const shortcutMap = new Map([
      [Tags.HTML, '#f76a05'],
      [Tags.CSS, '#0531f5'],
      [Tags.JAVASCRIPT, '#f7c305'],
      [Tags.TYPESCRIPT, '#5e9cf2'],
      [Tags.ANGULAR, '#f71643'],
      [Tags.RXJS, '#ed2165'],
      [Tags.NGRX, '#da07e6'],
      [Tags.PROJECT_PATTERNS, '#999394'],
    ]);
    return shortcutMap.get(value) as string;
  }
}
