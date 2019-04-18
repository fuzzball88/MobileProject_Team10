import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchByIntendedUsePage } from './search-by-intended-use.page';

const routes: Routes = [
  {
    path: '',
    component: SearchByIntendedUsePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchByIntendedUsePage]
})
export class SearchByIntendedUsePageModule {}
