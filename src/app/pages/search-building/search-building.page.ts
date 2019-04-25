import { Component, OnInit } from "@angular/core";
import { ConsumptionService } from "../../consumption.service";

@Component({
  selector: "app-search-building",
  templateUrl: "./search-building.page.html",
  styleUrls: ["./search-building.page.scss"]
})
export class SearchBuildingPage implements OnInit {
  estateData: any;
  estateDataNames = [];
  estateInitial = [];
  searchEstateString = "";

  constructor(private consumptionService: ConsumptionService) {}

  ngOnInit() {
    this.GetAllEstates();
  }

  searchEstate(searchVal) {
    this.estateData = this.estateInitial;
    var q: string = searchVal.target.value;
    console.log(q);

    if (q.trim() == "") {
      return;
    }

    this.estateData = this.estateData.filter(v => {
      if (v.property_name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
    this.estateData.sort((a, b) =>
      a.property_name > b.property_name
        ? 1
        : b.property_name > a.property_name
        ? -1
        : 0
    );
  }

  GetAllEstates() {
    this.consumptionService.GetObservableEstates().subscribe(data => {
      this.estateData = data;
      this.estateInitial = data;

      for (let i = 0; i < this.estateData.length; i++) {
        this.estateDataNames.push(this.estateData[i].property_name);
      }
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
