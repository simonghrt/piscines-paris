import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class PiscineService {
  constructor(private http:HttpClient) {}

  private piscineQueryUrl: string = "https://meslieux.paris.fr/proxy/data/get/equipements/get_equipements";
  private equipmentId: string = "27";
  private lat: string = "48.8742";
  private lon: string = "2.38";
  private limit: number = 500;
  private order: string = "name%20ASC";

  makeUrl(): string {
    return this.piscineQueryUrl + "?m_tid=" + this.equipmentId + "&limit=" + this.limit +
      "&order=" + this.order + "&lat=" + this.lat + "&lon=" + this.lon;
  }

  getPiscines(): Observable<any> {
    let url = this.makeUrl();
    return this.http.get<any[]>(url);
  }
}
