import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PiscineService } from '../../services/piscines.service';

@Component({
  selector: 'options',
  templateUrl: 'options.html'
})
export class OptionsComponent {

  @Input() isOpenNow: boolean = false;
  @Output() filterOpen = new EventEmitter<boolean>();

  constructor(public piscineService: PiscineService) {
  }

  ionViewDidLoad() {
  }

  toggleOpen() {
    this.isOpenNow = !this.isOpenNow;
    if (this.isOpenNow) {
      this.piscineService.filterOpenPiscines();
      this.filterOpen.emit(true);
    } else {
      this.filterOpen.emit(false);
    }
  }

  updateLoc() {}
}
