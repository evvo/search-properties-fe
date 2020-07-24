import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HereMapComponent } from './here-map/here-map.component';
import { NguCarouselModule } from '@ngu/carousel';
import { PropertiesCarouselComponent } from './properties-carousel/properties-carousel.component';
import {Daterangepicker} from "ng2-daterangepicker";
import { BookingFormComponent } from './booking-form/booking-form.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { MenuComponent } from './menu/menu.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ErrorsComponent } from './errors/errors.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    HereMapComponent,
    PropertiesCarouselComponent,
    BookingFormComponent,
    MenuComponent,
    ErrorsComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    NguCarouselModule,
    Daterangepicker,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
