import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { PiscineService } from '../../services/piscines.service';

@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapPiscine {
  map: GoogleMap;
  piscines: any[];
  lat: number = 48.866667;
  lng: number = 2.333333;

  constructor(public navCtrl: NavController, public piscineService: PiscineService,
    public geolocation: Geolocation) {
    // Think about the whole lifecycle (constructor isn't probably the good place for loadMap)
    this.geolocation.getCurrentPosition().then((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.loadMap();
      this.piscineService.updateLoc(this.lat, this.lng)
      .then(() => {
        this.loadMarkers();
      });
    })
    .catch((err) => {
      console.log("Current position not available");
    });
  }

  ionViewDidLoad() {
    this.loadMap();
    this.piscines = this.piscineService.getPiscines();
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: this.lat,
           lng: this.lng
         },
         zoom: 15
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    this.map.on(GoogleMapsEvent.CAMERA_MOVE_END).subscribe((params: any[]) => {
      let latLng: any = params[0];
      alert(latLng + " is clicked!");
    });
  }

  loadMarkers() {
    this.piscines.forEach((piscine) => {
      // We can get the marker or a promise with this marker
      this.map.addMarkerSync({
        title: piscine.name,
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: piscine.lat,
          lng: piscine.lon
        }
      });
    });
  }
}
