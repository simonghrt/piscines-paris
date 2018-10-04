import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Geolocation } from '@ionic-native/geolocation';
import { PiscineService } from '../../services/piscines.service';

@Component({
  selector: 'list',
  templateUrl: 'list.html'
})
export class ListPiscine {
  piscines: any[];
  isOpenNow: boolean = false;
  lat: number = 48.866667;
  lng: number = 2.333333;

  constructor(public navCtrl: NavController, public nativeStorage: NativeStorage,
    public piscineService: PiscineService, public geolocation: Geolocation) {
      this.geolocation.getCurrentPosition().then((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      })
      .catch((err) => {
        console.log("Current position not available");
      });
  }

  ionViewDidLoad() {
    this.piscineService.requestPiscines()
    .then((piscines) => {
      this.piscines = piscines;
    })
    .catch((err) => {
      console.log("error :" + err);
    });
  }

  ionViewDidEnter() {
    this.nativeStorage.getItem('isOpenNow')
    .then((isOpenNow) => {
      this.isOpenNow = isOpenNow;
      this.changePiscines(isOpenNow);
    });
  }

  onFilterOpen(openNow: boolean) {
    this.nativeStorage.setItem('isOpenNow', openNow)
    .then(() => {
      this.isOpenNow = openNow;
      this.changePiscines(openNow);
    });
  }

  changePiscines(openNow: boolean) {
    if (openNow) {
      this.piscineService.filterOpenPiscines();
      this.piscineService.getPiscinesNow()
      .then((piscines) => {
        this.piscines = piscines;
      });
    } else {
      this.piscineService.getPiscines()
      .then((piscines) => {
        this.piscines = piscines;
      });

    }
  }
}
