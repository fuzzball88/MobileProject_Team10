import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchIntendedUsePage } from './search-intended-use.page';

const routes: Routes = [
  {
    path: '',
    component: SearchIntendedUsePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchIntendedUsePage]
})
export class SearchIntendedUsePageModule {}
