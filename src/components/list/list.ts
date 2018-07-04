import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { PiscineService } from '../../services/piscines.service';

@Component({
  selector: 'list',
  templateUrl: 'list.html'
})
export class ListPiscine {
  piscines: any[];
  isOpenNow: boolean = false;

  constructor(public navCtrl: NavController, public nativeStorage: NativeStorage,
    public piscineService: PiscineService) {
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
      this.piscines = this.piscineService.getPiscinesNow();
    } else {
      this.piscines = this.piscineService.getPiscines();
    }
  }
}
