import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPiscine } from '../components/map/map';
import { ListPiscine } from '../components/list/list';
import { OptionsComponent } from '../components/options/options';
import { DistanceCoordsPipe } from '../pipes/distance.pipe';
import { ShortenPipe } from '../pipes/shorten.pipe';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPiscine,
    ListPiscine,
    OptionsComponent,
    DistanceCoordsPipe,
    ShortenPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPiscine,
    ListPiscine,
    OptionsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
