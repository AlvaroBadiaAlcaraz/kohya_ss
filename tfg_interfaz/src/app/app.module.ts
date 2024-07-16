import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PruebaComponent } from './prueba/prueba.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InterfazModule } from './project/interfaz/interfaz/interfaz.module';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './project/home/home.component';
import { RequisitosComponent } from './project/requisitos/requisitos.component';
import { EntornoComponent } from './project/entorno/entorno.component';
import { CaptionComponent } from './project/caption/caption.component';
import { TrainComponent } from './project/train/train.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InterfazModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
