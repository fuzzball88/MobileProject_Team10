import { Component } from "@angular/core";
import { ConsumptionService } from "../consumption.service";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page {
  estateData: any;
  modifiedData: any;
  districts: string[] = [];
  purposes: string[] = [];
  id: string;
  inputId: string;

  constructor(private consumptionService: ConsumptionService) {}

  //Get all estates or one if id is given
  getEstates(id?: string) {
    console.log(id);
    this.consumptionService.getEstates(id).then(
      data => {
        this.estateData = data;
        console.log(this.estateData);
      },
      err => {
        console.log(err);
      }
    );
  }

  //Get yearly consumption details
  //param1: Year returns all details with same year
  //param2: id returns all details for id
  getYears(year?: string, id?: string) {
    console.log(year);
    console.log(id);
    this.consumptionService.getYears(year, id).then(
      data => {
        this.estateData = data;
        console.log(this.estateData);
      },
      err => {
        console.log(err);
      }
    );
  }

  //Get monthly consumption details
  //param1: Year returns all details with same year
  //param2: id returns all details for id
  getMonths(year?: string, id?: string) {
    console.log(year);
    console.log(id);
    this.consumptionService.getMonths(year, id).then(
      data => {
        this.estateData = data;
        console.log(this.estateData);
      },
      err => {
        console.log(err);
      }
    );
  }

  //Get heating details
  //If id is given it will return that estates heating details.
  getHeatings(id?: string) {
    this.consumptionService.getHeatings(id).then(
      data => {
        this.estateData = data;
        console.log(this.estateData);
      },
      err => {
        console.log(err);
      }
    );
  }

  //Get usage info
  //If usage info id is used it will return all estates with that id.
  getUses(id?: string) {
    this.consumptionService.getUses(id).then(
      data => {
        this.estateData = data;
        console.log(this.estateData);
      },
      err => {
        console.log(err);
      }
    );
  }

  //Test filter function
  filterData() {}

  getInfos() {
    let usageRaw = [];

    for (let part of this.estateData) {
      if (!this.districts.includes(part.district_name)) {
        this.districts.push(part.district_name);
      }
      if (!usageRaw.includes(part.intended_use)) {
        usageRaw.push(part.intended_use);
      }
    }
    console.log(usageRaw);
    usageRaw.forEach(element => {
      if (element === null) {
        element = "000 Muu käyttötarkoitus";
      }
      let i = element.substring(4);
      this.purposes.push(i);
      console.log(i);
    });
    console.log(this.districts);
    console.log(this.purposes);
  }
}
