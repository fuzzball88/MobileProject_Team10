import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", loadChildren: "./tabs/tabs.module#TabsPageModule" },
  {
    path: "search-district",
    loadChildren:
      "./pages/search-district/search-district.module#SearchDistrictPageModule"
  },
  {
    path: "search-by-district",
    loadChildren:
      "./pages/search-by-district/search-by-district.module#SearchByDistrictPageModule"
  },
  {
    path: "estate-info",
    loadChildren: "./pages/estate-info/estate-info.module#EstateInfoPageModule"
  },  { path: 'maptest', loadChildren: './pages/maptest/maptest.module#MaptestPageModule' },
  { path: 'map-page', loadChildren: './pages/map-page/map-page.module#MapPagePageModule' },
  { path: 'search-intended-use', loadChildren: './pages/search-intended-use/search-intended-use.module#SearchIntendedUsePageModule' },
  { path: 'search-by-intended-use', loadChildren: './pages/search-by-intended-use/search-by-intended-use.module#SearchByIntendedUsePageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
