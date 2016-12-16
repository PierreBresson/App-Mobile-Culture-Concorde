import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'player',
  templateUrl: 'player.html'
})
export class PlayerComponent {

  @Output() controls: EventEmitter<any> = new EventEmitter();

  public icon: string;

  constructor() {
    this.icon = "pause";
  }

  playpause() {
    if (this.icon == "play") {
      this.icon = "pause";
      this.controls.emit({action: "play"});
    } else {
      this.icon = "play"
      this.controls.emit({action: "pause"});
    }
  }

  next(){
    this.controls.emit({action: "next"});
    if(this.icon == "play") {
      this.icon = "pause"
    }
  }

  prev(){
    this.controls.emit({action: "prev"});
    if(this.icon == "play") {
      this.icon = "pause"
    }
  }

}
