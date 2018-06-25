import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

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

  makeUrl(): void {
    this.urlComplete = this.piscineQueryUrl + "?m_tid=" + this.equipmentId + "&limit=" + this.limit +
      "&order=" + this.order + "&lat=" + this.lat + "&lon=" + this.lng;
  }

  updateLoc(lat: number, lng: number): Promise<any> {
    this.lat = lat;
    this.lng = lng;
    return this.requestPiscines();
  }

  getPiscines(): any[] {
    return this.piscines;
  }

  // TODO Use Observable instead of promise
  requestPiscines(): Promise<any> {
    // TODO Make a promise or something like this with the makeUrl
    this.makeUrl();
    return this.http.get<any[]>(this.urlComplete).toPromise()
    .then((data) => {
      this.piscines = data;
    }, (err) => {
      console.log("error :" + err);
    });
  }
}
