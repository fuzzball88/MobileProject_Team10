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
    setTimeout(() => {
      this.GetObjEstatesByDistrict(this.consumptionService.activeDistrict);
    }, 20);
    //console.log(this.estateData);
    //console.log(this.estateData);
  }

  ngOnInit() {
    //this.chosenDistrict = this.consumptionService.activeDistrict;
    /*
    setTimeout(() => {
      this.GetObjEstatesByDistrict(this.consumptionService.activeDistrict);
    }, 50);
    */
    //this.estateData = this.consumptionService.allEstates;
    //https://api.ouka.fi/v1/properties_basic_information?district_name=like.Ylikiiminki%
    //console.log(this.estateData);
    //this.estateData.sort();
    //console.log(this.estateData);
  }

  GetObjEstatesByDistrict(district: string) {
    this.consumptionService
      .GetObservableDistrictEstates(district)
      .subscribe(data => {
        console.log(data);
        this.estateData = data;
        this.estateData.sort((a, b) =>
          a.property_name > b.property_name
            ? 1
            : b.property_name > a.property_name
            ? -1
            : 0
        );
      });
  }

  UpdateActiveEstate(id: string) {
    this.consumptionService.activeEstateId = id;
    this.consumptionService.GetObjEstate(id);
  }
}
