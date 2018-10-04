import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';
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
  isOpenNow: boolean = false;

  constructor(public navCtrl: NavController, public nativeStorage: NativeStorage,
    public piscineService: PiscineService, public geolocation: Geolocation) {

    // TODO Only when click on position
    this.geolocation.getCurrentPosition().then((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.loadMap();
      this.piscineService.updateLoc(this.lat, this.lng)
      .then((piscines) => {
        this.piscines = piscines;
        this.loadMarkers();
      });
    })
    .catch((err) => {
      console.log("Current position not available");
    });
    this.loadMap();
  }

  ionViewDidLoad() {
    this.piscineService.requestPiscines()
    .then((piscines) => {
      this.piscines = piscines;
      this.loadMarkers();
    })
    .catch((err) => {
      console.log("error :" + err);
    });
  }

  ionViewDidEnter() {
    this.nativeStorage.getItem('isOpenNow')
    .then((isOpenNow) => {
      this.isOpenNow = isOpenNow;
      this.changePiscines(isOpenNow)
      .then(() => {
        this.loadMarkers();
      });
    });
  }

  // TODO Make a promise
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

    // Maybe not useful to do this
    // this.map.on(GoogleMapsEvent.CAMERA_MOVE_END).subscribe((params: any[]) => {
    //   if (params[0] && params[0]["target"]) {
    //     this.lat = params[0]["target"]["lat"];
    //     this.lng = params[0]["target"]["lng"];
    //     this.piscineService.updateLoc(this.lat, this.lng)
    //     .then(() => {
    //       this.loadMarkers();
    //     });
    //   }
    // });
  }

  loadMarkers() {
    this.map.clear();
    this.piscines.forEach((piscine) => {
      // TODO Mettre infos à propos de piscine
      this.map.addMarkerSync({
        title: piscine.name + ' - ' + piscine.address + ' ' + piscine.zip_code,
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: piscine.lat,
          lng: piscine.lon
        }
      });
    });
  }

  onFilterOpen(openNow: boolean) {
    this.nativeStorage.setItem('isOpenNow', openNow)
    .then(() => {
      this.isOpenNow = openNow;
      this.changePiscines(openNow)
      .then(() => {
        this.loadMarkers();
      });
    });
  }

  changePiscines(openNow: boolean): Promise<any> {
    if (openNow) {
      this.piscineService.filterOpenPiscines();
      return this.piscineService.getPiscinesNow()
      .then((piscines) => {
        this.piscines = piscines;
      });
    } else {
      return this.piscineService.getPiscines()
      .then((piscines) => {
        this.piscines = piscines;
      });
    }
  }
}
