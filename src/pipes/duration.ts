import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'duration'
})
@Injectable()
export class DurationPipe {
  transform(value, args) {
    var duration = Math.floor((value/1000/60) << 0) + ':' + Math.floor((value/1000) % 60);
    return duration;
  }
}
