import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'distanceCoords'})
export class DistanceCoordsPipe implements PipeTransform {
  transform(lat: number, lng: number, lat2: number, lng2: number): string {
    // alert(lat);
    // alert(lng);
    // alert(lat2);
    // alert(this.distanceInKmBetweenEarthCoordinates(34.64, 34.77, 45.87, 55.23));
    return this.distanceInKmBetweenEarthCoordinates(lat, lng, lat2, lng2).toString();
  }

  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    // alert(lat1);
    let earthRadiusKm = 6371;

    let dLat = this.degreesToRadians(lat2-lat1);
    let dLon = this.degreesToRadians(lon2-lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return earthRadiusKm * c;
  }
}
