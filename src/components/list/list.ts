import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'list',
  templateUrl: 'list.html'
})
export class ListPiscine {
  piscines: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.piscines = this.navParams.data;
    this.piscines = [
      {
        "name": "Hello"
      },
      {
        "name": "Boum"
      }
    ];
  }

  ionViewDidLoad() {
  }
}
