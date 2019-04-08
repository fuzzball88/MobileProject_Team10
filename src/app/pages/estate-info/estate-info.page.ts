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
  estateId: string = null;
  selectedEstate: any;
  yearsConsumption: any;
  iterationYears: number[] = [];
  iterationYear: string[] = [];
  years: string[] = [];

  constructor(
    private consumptionService: ConsumptionService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.urlId = this.activatedRoute.snapshot.paramMap.get("id");
    if (!this.urlId) {
      this.estateId = this.consumptionService.activeEstateId;
    } else {
      this.estateId = this.urlId;
    }
    this.GetObjEstates(this.estateId);
    this.GetObjConsumption(null, this.estateId);
    this.UpdateYears();
  }
  ionViewWillEnter() {
    this.urlId = this.activatedRoute.snapshot.paramMap.get("id");
    if (!this.urlId) {
      this.estateId = this.consumptionService.activeEstateId;
    } else {
      this.estateId = this.urlId;
    }
    this.GetObjEstates(this.estateId);
    this.GetObjConsumption(null, this.estateId);
    this.UpdateYears();
  }

  GetObjEstates(id: string) {
    this.consumptionService.GetObservableEstates(id).subscribe(data => {
      this.selectedEstate = data;
      //console.log(this.selectedEstate);
    });
  }

  GetObjConsumption(year: string, id: string) {
    this.consumptionService.GetObservableYears(year, id).subscribe(data => {
      this.yearsConsumption = data;
      //console.log(this.yearsConsumption);
    });
  }

  UpdateYears() {
    //let estateYearConsumption = {};
    console.log(this.yearsConsumption);
    for (let part of this.yearsConsumption) {
      if (!this.iterationYears.includes(part.year)) {
        this.iterationYears.push(part.year);
        /*
        this.consumptionService
          .GetObservableYears(part.year, this.estateId)
          .subscribe(data => {
            this.years.push(data);
          });*/
      }
    }
    this.iterationYears.sort(function(a: number, b: number) {
      return b - a;
    });
    console.log(this.iterationYears);
    for (let part of this.iterationYears) {
      console.log(part);
      this.consumptionService
        .GetObservableYears(String(part), this.estateId)
        .subscribe(data => {
          this.years.push(data);
        });
    }
    console.log(this.years);
  }

  //Creates an object of the yearly consumption data
  /*
  UpdateYearsToObject() {
    let estateYearConsumption = {};
    for (let part of this.yearsConsumption) {
      if (!this.iterationYears.includes(part.year)) {
        this.iterationYears.push(part.year);
      }
    }
    //console.log(this.iterationYears);
    for (let part of this.iterationYears) {
      this.consumptionService
        .GetObservableYears(part, this.estateId)
        .subscribe(data => {
          estateYearConsumption[part] = data;
          //console.log(this.yearsConsumption);
        });
    }
    //console.log(estateYearConsumption);
    //UNCOMMENT TO Activate
    //this.years = estateYearConsumption;
    console.log(this.years);
  }
  */
}
