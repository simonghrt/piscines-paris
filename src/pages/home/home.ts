import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { PiscineService } from '../../services/piscines.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [PiscineService]
})
export class HomePage {
  map: GoogleMap;
  piscines: any[] = [];

  constructor(public navCtrl: NavController, public piscineService: PiscineService) {

  }

  ionViewDidLoad() {
    this.piscineService.getPiscines()
    .subscribe((data) => {
      console.log(data);
      this.piscines = data;
    })
    this.loadMap();
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // let marker: Marker = this.map.addMarkerSync({
    //   title: 'Ionic',
    //   icon: 'blue',
    //   animation: 'DROP',
    //   position: {
    //     lat: 43.0741904,
    //     lng: -89.3809802
    //   }
    // });
    // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    //   alert('clicked');
    // });
  }

}
