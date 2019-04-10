import { Component, OnInit } from "@angular/core";
import { ConsumptionService } from "../consumption.service";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page implements OnInit {
  estateData: any;
  modifiedData: any;
  districts: string[] = [];
  purposes: string[] = [];
  id: string;
  inputId: string;
  value: string = null;

  constructor(private consumptionService: ConsumptionService) {}

  ngOnInit() {
    console.log("NG INIT TÄSÄ MORO");
    this.GetObjEstates();
    //this.GetEstates();
    //console.log(this.estateData);
    //this.GetDistricts();
    //console.log(this.districts);
  }

  ionViewWillEnter() {
    this.GetObjEstates();
  }

  GetObjEstates() {
    this.consumptionService.GetObservableEstates().subscribe(data => {
      console.log(data);
      this.consumptionService.allEstates = data;
    });
  }

  //Get all estates or one if id is given
  GetEstates(id?: string) {
    //console.log(id);
    this.consumptionService.getEstates(id).then(
      data => {
        this.estateData = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
    console.log(this.estateData);
  }

  GetDistricts() {
    for (let part of this.estateData) {
      if (!this.districts.includes(part.district_name)) {
        this.districts.push(part.district_name);
      }
    }
  }

  ResetSelections() {
    this.consumptionService.ResetActiveSelections();
  }
}
