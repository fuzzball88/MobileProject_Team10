import { Component, OnInit } from "@angular/core";
import { ConsumptionService } from "../../consumption.service";

@Component({
  selector: "app-search-by-district",
  templateUrl: "./search-by-district.page.html",
  styleUrls: ["./search-by-district.page.scss"]
})
export class SearchByDistrictPage implements OnInit {
  //chosenDistrict: string = null;
  estateData: any;

  constructor(private consumptionService: ConsumptionService) {}
  ionViewWillEnter() {
    this.GetObjEstatesByDistrict(this.consumptionService.activeDistrict);
  }

  ngOnInit() {
    //this.chosenDistrict = this.consumptionService.activeDistrict;
    this.GetObjEstatesByDistrict(this.consumptionService.activeDistrict);
    //this.estateData = this.consumptionService.allEstates;
    //https://api.ouka.fi/v1/properties_basic_information?district_name=like.Ylikiiminki%
  }

  GetObjEstatesByDistrict(district: string) {
    this.consumptionService
      .GetObservableDistrictEstates(district)
      .subscribe(data => {
        console.log(data);
        this.estateData = data;
      });
  }

  UpdateActiveEstate(id: string) {
    this.consumptionService.activeEstateId = id;
    this.consumptionService.GetObjEstate(id);
  }
}
