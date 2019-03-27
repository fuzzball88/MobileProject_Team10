import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "tab1",
        children: [
          {
            path: "",
            loadChildren: "../tab1/tab1.module#Tab1PageModule"
          }
        ]
      },
      {
        path: "tab2",
        children: [
          {
            path: "",
            loadChildren: "../tab2/tab2.module#Tab2PageModule"
          }
        ]
      },
      {
        path: "tab3",
        children: [
          {
            path: "",
            loadChildren: "../tab3/tab3.module#Tab3PageModule"
          }
        ]
      },
      {
        path: "",
        redirectTo: "/tabs/tab1",
        pathMatch: "full"
      },
      //My own add
      {
        path: "search-by-district",
        children: [
          {
            path: "",
            loadChildren:
              "../pages/search-by-district/search-by-district.module#SearchByDistrictPageModule"
          }
        ]
      },
      {
        path: "estate-info",
        children: [
          {
            path: "",
            loadChildren:
              "../pages/estate-info/estate-info.module#EstateInfoPageModule"
          }
        ]
      },
      {
        path: "search-district",
        children: [
          {
            path: "",
            loadChildren:
              "../pages/search-district/search-district.module#SearchDistrictPageModule"
          }
        ]
      }
      //Own ends
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/tab1",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
