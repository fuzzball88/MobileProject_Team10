import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", loadChildren: "./tabs/tabs.module#TabsPageModule" }
  /*
  {
    path: "search-by-district",
    loadChildren:
      "./pages/search-by-district/search-by-district.module#SearchByDistrictPageModule"
  },
  {
    path: "estate-info",
    loadChildren: "./pages/estate-info/estate-info.module#EstateInfoPageModule"
  }
  */
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
