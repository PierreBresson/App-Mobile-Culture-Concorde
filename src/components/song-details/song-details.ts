import { Component, Input } from '@angular/core';


@Component({
  selector: 'song-details',
  templateUrl: 'song-details.html'
})
export class SongDetailsComponent {

  @Input() song: any;
  @Input() dynamicColor;

  constructor() {
  }

}
