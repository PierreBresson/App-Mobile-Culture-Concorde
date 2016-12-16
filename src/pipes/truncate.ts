import {Pipe} from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe {
  transform(value: string) : string {
    let limit = 30;
    let trail = '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
