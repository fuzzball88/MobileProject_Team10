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
          },
          //Test start
          {
            path: "search-district",
            children: [
              {
                path: "",
                loadChildren:
                  "../pages/search-district/search-district.module#SearchDistrictPageModule"
              },
              {
                path: "search-by-district",
                children: [
                  {
                    path: "",
                    loadChildren:
                      "../pages/search-by-district/search-by-district.module#SearchByDistrictPageModule"
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
                    path: "estate-info/:id",
                    children: [
                      {
                        path: "",
                        loadChildren:
                          "../pages/estate-info/estate-info.module#EstateInfoPageModule"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            path: "search-intended-use",
            children: [
              {
                path: "",
                loadChildren:
                  "../pages/search-intended-use/search-intended-use.module#SearchIntendedUsePageModule"
              },
              {
                path: "search-by-intended-use",
                children: [
                  {
                    path: "",
                    loadChildren:
                      "../pages/search-by-intended-use/search-by-intended-use.module#SearchByIntendedUsePageModule"
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
                    path: "estate-info/:id",
                    children: [
                      {
                        path: "",
                        loadChildren:
                          "../pages/estate-info/estate-info.module#EstateInfoPageModule"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            path: "search-building",
            children: [
              {
                path: "",
                loadChildren:
                  "../pages/search-building/search-building.module#SearchBuildingPageModule"
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
                  path: "estate-info/:id",
                  children: [
                    {
                      path: "",
                      loadChildren:
                        "../pages/estate-info/estate-info.module#EstateInfoPageModule"
                    }
                  ]
                }
            ]
          }
          ///
        ]
      },
      {
        path: "tab3",
        children: [
          {
            path: "",
            loadChildren: "../tab3/tab3.module#Tab3PageModule"
          },
          {
            path: "maptest",
            children: [
              {
                path: "",
                loadChildren:
                  "../pages/maptest/maptest.module#MaptestPageModule"
              },
              {
                path: "estate-info-id/:id",
                children: [
                  {
                    path: "",
                    loadChildren:
                      "../pages/estate-info-id/estate-info-id.module#EstateInfoIdPageModule"
                  }
                ]
              },
              {
                path: "estate-info/:id",
                children: [
                  {
                    path: "",
                    loadChildren:
                      "../pages/estate-info/estate-info.module#EstateInfoPageModule"
                  }
                ]
              }
            ]
          },
          {
            path: "map-page",
            children: [
              {
                path: "",
                loadChildren:
                  "../pages/map-page/map-page.module#MapPagePageModule"
              },
              {
                path: "estate-info-id/:id",
                children: [
                  {
                    path: "",
                    loadChildren:
                      "../pages/estate-info-id/estate-info-id.module#EstateInfoIdPageModule"
                  }
                ]
              },
              {
                path: "estate-info/:id",
                children: [
                  {
                    path: "",
                    loadChildren:
                      "../pages/estate-info/estate-info.module#EstateInfoPageModule"
                  }
                ]
              }
            ]
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
