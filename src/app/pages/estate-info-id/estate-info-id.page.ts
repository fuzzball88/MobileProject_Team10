import { Component, OnInit } from "@angular/core";
import { ConsumptionService } from "../../consumption.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-estate-info-id",
  templateUrl: "./estate-info-id.page.html",
  styleUrls: ["./estate-info-id.page.scss"]
})
export class EstateInfoIdPage implements OnInit {
  urlId = null;
  selectedEstate: any;
  yearsConsumption: any;
  year: string[] = [];

  constructor(
    private consumptionService: ConsumptionService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.GetObjEstates(this.consumptionService.activeEstateId);
    this.GetObjConsumption(null, this.consumptionService.activeEstateId);
    this.UpdateYears();
  }
  ionViewWillEnter() {
    this.urlId = this.activatedRoute.snapshot.paramMap.get("id");
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
