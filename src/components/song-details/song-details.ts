import { Component, Input } from '@angular/core';


@Component({
  selector: 'song-details',
  templateUrl: 'song-details.html'
})
export class SongDetailsComponent {

  @Input() song: any;
  @Input() dynamicColor;
  @Input() size: any;
  @Input() time:number;

  constructor() {}

  ngOnInit(){
    if(this.size){
      console.log(this.size);
    } else{
      this.size = "1000";
    }
    console.log(this.song.duration);
  }

  displayLoadingImage(){
  }

}
