import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class ColorExtractor {

  constructor(public http: Http) {
    console.log('Hello ColorExtractor Provider');
  }

  getColor(url: string){
    //var vibrant = new Vibrant(url);

    
    //Vibrant.from('path/to/image').getPalette(function(err, palette) {});

    //Vibrant.from(url).getPalette(function(err, palette) {});
    /*
    var swatches = vibrant.swatches();
    for (var swatch in swatches) {
        if (swatches.hasOwnProperty(swatch) && swatches[swatch])
            console.log(swatch, swatches[swatch].getHex())
    }*/

  }

}
