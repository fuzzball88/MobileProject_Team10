import { Component, OnInit } from "@angular/core";
import { ConsumptionService } from "../../consumption.service";

@Component({
  selector: "app-search-district",
  templateUrl: "./search-district.page.html",
  styleUrls: ["./search-district.page.scss"]
})
export class SearchDistrictPage implements OnInit {
  districtName: string = null;
  districts: string[] = [];
  estateData: any;
  modifiedData: any;

  constructor(private consumptionService: ConsumptionService) {}

  ngOnInit() {
    /*
    //Test to assign estatedata from services

    this.GetObjEstates();
    this.estateData = this.consumptionService.allEstates;
    this.UpdateDistricts();
    */
  }

  ionViewWillEnter() {
    this.GetObjEstates();
    this.estateData = this.consumptionService.allEstates;
    this.UpdateDistricts();
  }

  GetObjEstates() {
    this.consumptionService.GetObservableEstates().subscribe(data => {
      console.log(data);
      this.consumptionService.allEstates = data;
    });
  }

  UpdateDistricts() {
    for (let part of this.estateData) {
      if (!this.districts.includes(part.district_name)) {
        this.districts.push(part.district_name);
      }
    }
    console.log(this.districts);
    this.districts.sort();
  }

  UpdateActiveDistrict(name: string) {
    this.consumptionService.activeDistrict = name;
  }
}
