import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { EstateInfoIdPage } from "./estate-info-id.page";

const routes: Routes = [
  {
    path: "",
    component: EstateInfoIdPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EstateInfoIdPage]
})
export class EstateInfoIdPageModule {}
