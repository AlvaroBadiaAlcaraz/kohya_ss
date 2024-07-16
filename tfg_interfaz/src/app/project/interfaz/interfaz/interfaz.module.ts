import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PruebaComponent } from '../../../prueba/prueba.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from '../../home/home.component';
import { RequisitosComponent } from '../../requisitos/requisitos.component';
import { EntornoComponent } from '../../entorno/entorno.component';
import { CaptionComponent } from '../../caption/caption.component';
import { TrainComponent } from '../../train/train.component';



@NgModule({
  declarations: [
    HomeComponent,
    RequisitosComponent,
    EntornoComponent,
    CaptionComponent,
    TrainComponent,
    PruebaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports:[
    HomeComponent,
    RequisitosComponent,
    EntornoComponent,
    CaptionComponent,
    TrainComponent,
    PruebaComponent
  ]
})
export class InterfazModule { }
