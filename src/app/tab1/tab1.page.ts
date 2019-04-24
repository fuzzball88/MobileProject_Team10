import { Component, OnInit } from "@angular/core";
import { ConsumptionService } from "../consumption.service";
import { OpenStreetMapProvider } from "leaflet-geosearch";

// setup
const provider = new OpenStreetMapProvider();

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
  numberOfEstates: number = 0;

  ngOnInit() {
    setTimeout(() => {
      this.saveAllEstates();
    }, 50);
    /*
    setTimeout(() => {
      this.createMarkerArray();
    }, 500);
    */
  }
  ionViewWillEnter() {
    //this.saveAllEstates();
  }

  constructor(private consumptionService: ConsumptionService) {}

  testTero() {
    setTimeout(() => {
      this.createMarkerArray();
    }, 500);
  }
  async showArray() {
    /*
    let coordinate = await this.searchEstateSync2(
      "etupääntie 19,90650,Oulu,Finland"
    );
    console.log(coordinate);
    */
    provider
      .search({ query: "etupääntie 19,90650,Oulu,Finland" })
      .then(function(result) {
        console.log(result);
      });
  }

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

  createMarkerArray() {
    this.consumptionService.allEstates.forEach(async element => {
      let elementData = {
        x: Number,
        y: Number,
        name: String,
        id: String
      };
      let coordinate = await this.searchEstateSync2(
        element.property_address +
          " " +
          element.postal_code +
          " " +
          element.postal_area
      );

      if (
        typeof coordinate != "undefined" &&
        coordinate != null &&
        coordinate.length != null &&
        coordinate.length > 0
      ) {
        elementData.x = coordinate[0].x;
        elementData.y = coordinate[0].y;
        elementData.name = element.property_name;
        elementData.id = element.property_id;

        this.consumptionService.markerArray.push(elementData);
      } else {
        console.log("Error with coordinates");
      }
    });
  }

  async searchEstateSync2(address) {
    console.log(provider.search({ query: address }));
    return await provider.search({ query: address });
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
