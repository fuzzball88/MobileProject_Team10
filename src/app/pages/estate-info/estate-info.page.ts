import { Component, OnInit } from "@angular/core";
import { ConsumptionService } from "../../consumption.service";

@Component({
  selector: "app-estate-info",
  templateUrl: "./estate-info.page.html",
  styleUrls: ["./estate-info.page.scss"]
})
export class EstateInfoPage implements OnInit {
  selectedEstate: any;
  yearsConsumption: any;
  year: string[] = [];

  constructor(private consumptionService: ConsumptionService) {}

  ngOnInit() {
    this.GetObjEstates(this.consumptionService.activeEstateId);
    this.GetObjConsumption(null, this.consumptionService.activeEstateId);
    this.UpdateYears();
  }
  ionViewWillEnter() {
    this.GetObjEstates(this.consumptionService.activeEstateId);
    this.GetObjConsumption(null, this.consumptionService.activeEstateId);
    this.UpdateYears();
  }

  GetObjEstates(id: string) {
    this.consumptionService.GetObservableEstates(id).subscribe(data => {
      this.selectedEstate = data;
      console.log(this.selectedEstate);
    });
  }

  GetObjConsumption(year: string, id: string) {
    this.consumptionService.GetObservableYears(year, id).subscribe(data => {
      this.yearsConsumption = data;
      console.log(this.yearsConsumption);
    });
  }

  UpdateYears() {
    for (let part of this.yearsConsumption) {
      if (!this.year.includes(part)) {
        this.year.push(part);
      }
    }
    console.log(this.year);
  }
}
