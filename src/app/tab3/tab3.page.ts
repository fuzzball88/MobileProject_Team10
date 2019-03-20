import { Component } from "@angular/core";
import { ConsumptionService } from "../consumption.service";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page {
  estates: any;
  id: string;

  constructor(private consumptionService: ConsumptionService) {}

  //Get all estates or one if id is given
  getEstates(id?: string) {
    console.log(id);
    this.consumptionService.getEstates(id).then(
      data => {
        this.estates = data;
        console.log(this.estates);
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
        this.estates = data;
        console.log(this.estates);
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
        this.estates = data;
        console.log(this.estates);
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
        this.estates = data;
        console.log(this.estates);
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
        this.estates = data;
        console.log(this.estates);
      },
      err => {
        console.log(err);
      }
    );
  }
}
