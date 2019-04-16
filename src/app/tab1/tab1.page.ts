import { Component, OnInit } from "@angular/core";
import { ConsumptionService } from "../consumption.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
  numberOfEstates: number = 0;

  ngOnInit() {
    this.saveAllEstates();
  }
  ionViewWillEnter() {
    this.saveAllEstates();
  }

  constructor(private consumptionService: ConsumptionService) {}

  saveAllEstates() {
    this.consumptionService.GetObservableEstates().subscribe(data => {
      console.log(data);
      this.consumptionService.allEstates = data;
      this.numberOfEstates = this.objectLength(data);
      console.log(this.numberOfEstates);
      console.log(this.consumptionService.allEstates);
    });
  }

  objectLength(obj) {
    let result = 0;
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        // or Object.prototype.hasOwnProperty.call(obj, prop)
        result++;
      }
    }
    return result;
  }

  /*
  async saveAllEstate() {
    await this.consumptionService.getPromiseEstates().then(
      function(result) {
        console.log(result);
        this.allEstate = this.saveAllEstate();
        console.log(this.allEstate);
      },
      function(error) {
        console.log("Fuck something went wrong");
      }
    );
  }
  */
}
