import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PiscineService } from '../../services/piscines.service';
import { MapPiscine } from '../../components/map/map';
import { ListPiscine } from '../../components/list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [PiscineService]
})
export class HomePage {
  piscines: any[] = [];
  tab1: any;
  tab2: any;

  constructor(public navCtrl: NavController, public piscineService: PiscineService) {
    this.tab1 = MapPiscine;
    this.tab2 = ListPiscine;
  }

  ionViewDidLoad() {
    // Error there, why ?
    this.piscineService.getPiscines()
    .subscribe((data) => {
      this.piscines = data;
    }, (err) => {
      console.log("error :" + err);
    });
  }
}
