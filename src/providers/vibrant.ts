import { Injectable } from '@angular/core';
import * as vibrant from 'node-vibrant'

export interface Color {
	vibrant: string;
	muted: string;
	darkvibrant: string;
	darkmuted: string;
  lightvibrant: string;
  lightmuted: string;
}

@Injectable()
export class Vibrant {

  constructor() {}

  getVibrant(url){
    return new Promise((resolve, reject) => {
      let v = new vibrant(url.replace("t500x500.jpg","large.jpg"));
      v.getPalette(function(err, palette) {
				let color = {
					vibrant: "#000",
					muted: "#000",
					darkvibrant: "#fff",
					darkmuted: "#fff",
					lightvibrant: "#000",
					lightmuted: "#fff"
				}

				let palettebis = palette;

				try {
						const swatches = [palette.Muted, palette.DarkMuted, palette.LightMuted];
				    let rgb, r;
				    const isGrayscale = swatches.every((swatch) => {
				        rgb = swatch.getRgb();
				        r = rgb[0];
				        return rgb.every((color) => color === r);
				    });
				    if (isGrayscale) {
				        console.log("This image is grayscale.");
								reject(color);
				    }
				}
				catch (e) {
					console.log(e);
				}

        if (err) {
            reject(color);
        } else {
          let color = {
            vibrant: palettebis.Vibrant.getHex(),
            muted: palettebis.Muted.getHex(),
            darkvibrant: palettebis.DarkVibrant.getHex(),
            darkmuted: palettebis.DarkMuted.getHex(),
            lightvibrant: palettebis.LightVibrant.getHex(),
            lightmuted: palettebis.LightMuted.getHex()
          }
          resolve(color);
        }
      });
    });
  }

}
