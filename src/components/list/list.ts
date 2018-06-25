import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PiscineService } from '../../services/piscines.service';

@Component({
  selector: 'list',
  templateUrl: 'list.html'
})
export class ListPiscine {
  piscines: any[];

  constructor(public navCtrl: NavController, public piscineService: PiscineService) {
  }

  ionViewDidLoad() {
    this.piscines = this.piscineService.getPiscines();
    // this.piscines = [
    //   {"name": "Hello world"},
    //   {"name": "Hello world"},
    //   {"name": "Hello world"},
    //   {"name": "Hello world"},
    //   {"name": "Hello world"},
    //   {"name": "Hello world"},
    //   {"name": "Hello world"},
    //   {"name": "Hello world"},
    //   {"name": "Hello world"},
    //   {"name": "Hello world"},
    //   {"name": "Hello world"},
    //   {"name": "Hello world"},
    //   {"name": "Hello world"}
    // ];
  }
}
