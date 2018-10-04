import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

import * as moment from 'moment';

@Injectable()
export class PiscineService {
  constructor(private http:HttpClient) {}

  private piscineQueryUrl: string = "https://meslieux.paris.fr/proxy/data/get/equipements/get_equipements";
  private equipmentId: string = "27";
  private lat: number = 48.866667;
  private lng: number = 2.333333;
  private limit: number = 500;
  private order: string = "name%20ASC";

  private urlComplete: string;

  private piscines: any[] = [];
  private piscinesNow: any[] = [];
  
  public isOpenNow: boolean = false;

  makeUrl(): void {
    this.urlComplete = this.piscineQueryUrl + "?m_tid=" + this.equipmentId + "&limit=" + this.limit +
      "&order=" + this.order + "&lat=" + this.lat + "&lon=" + this.lng;
  }

  updateLoc(lat: number, lng: number): Promise<any> {
    this.lat = lat;
    this.lng = lng;
    return this.requestPiscines();
  }

  // TODO Faire ça en promise
  filterOpenPiscines(): any[] {
    let piscinesNow: any[] = [];
    let nowDate = moment().format("YYYY-MM-DD");
    // let nowHour = moment().format("HH:mm:ss");
    this.piscines.forEach((piscine) => {
      if (piscine["calendars"] && piscine["calendars"][nowDate] && piscine["calendars"][nowDate][0]) {
        let dayTimes: any = piscine["calendars"][nowDate];
        let isOpen: boolean = false;
        dayTimes.forEach((dayTime) => {
          if (moment(dayTime[0], "HH:mm:ss").isValid() && moment(dayTime[1], "HH:mm:ss").isValid()) {
            let before = moment(dayTime[0], "HH:mm:ss");
            let after = moment(dayTime[1], "HH:mm:ss");
            if (dayTime[0] != "closed" && moment().isBetween(before, after)) {
              isOpen = true;
            }  
          }
        });
        if (isOpen) {
          piscinesNow.push(piscine);
        }
      }
    });
    this.piscinesNow = piscinesNow;
    return piscinesNow;
  }

  getPiscines(): Promise<any[]> {
    return Promise.resolve(this.piscines);
  }

  getPiscinesNow(): Promise<any[]> {
    return Promise.resolve(this.piscinesNow);
  }

  // TODO Use Observable instead of promise
  requestPiscines(): Promise<any> {
    // TODO Make a promise or something like this with the makeUrl
    this.makeUrl();
    return this.http.get<any[]>(this.urlComplete).toPromise()
    .then((piscines) => {
      this.piscines = piscines;
      return Promise.resolve(piscines);
    }, (err) => {
      return Promise.reject(err);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  }
}
