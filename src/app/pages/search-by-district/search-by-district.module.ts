import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchByDistrictPage } from './search-by-district.page';

const routes: Routes = [
  {
    path: '',
    component: SearchByDistrictPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchByDistrictPage]
})
export class SearchByDistrictPageModule {}
