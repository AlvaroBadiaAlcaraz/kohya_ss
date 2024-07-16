import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruebaComponent } from './prueba/prueba.component';
import { HomeComponent } from './project/home/home.component';
import { RequisitosComponent } from './project/requisitos/requisitos.component';
import { EntornoComponent } from './project/entorno/entorno.component';
import { CaptionComponent } from './project/caption/caption.component';
import { TrainComponent } from './project/train/train.component';

const routes: Routes = [
  {
    path: 'prueba',
    component: PruebaComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'req',
    component: RequisitosComponent
  },
  {
    path: 'entorno',
    component: EntornoComponent
  },
  {
    path: 'caption',
    component: CaptionComponent
  },
  {
    path: 'train',
    component: TrainComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
