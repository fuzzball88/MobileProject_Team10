import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import leaflet from "leaflet";
import { ConsumptionService } from "../../consumption.service";
import { ActivatedRoute } from "@angular/router";
import { OpenStreetMapProvider } from "leaflet-geosearch";

const provider = new OpenStreetMapProvider();

@Component({
  selector: "app-estate-info",
  templateUrl: "./estate-info.page.html",
  styleUrls: ["./estate-info.page.scss"]
})
export class EstateInfoPage {
  @ViewChild("estate_map") mapContainer: ElementRef;
  estate_map: any;
  urlId = null;
  estateId: string = null;
  selectedEstate: any;
  estateData: any;
  yearsConsumption: any;
  iterationYears: number[] = [];
  iterationYear: string[] = [];
  years: string[] = [];
  myToken: string =
    "pk.eyJ1IjoiZnV6emJhbGw4OCIsImEiOiJjanRzaWFvMmswd2VnNGRvN29paTJtaHQzIn0.rwgnQNkKUE2I5YC75g3nqw";

  constructor(
    private consumptionService: ConsumptionService,
    private activatedRoute: ActivatedRoute
  ) {}

  /*
  ngOnInit() {
    console.log("ngOnInit used");
    this.urlId = this.activatedRoute.snapshot.paramMap.get("id");
    if (!this.urlId) {
      this.estateId = this.consumptionService.activeEstateId;
    } else {
      this.estateId = this.urlId;
    }
    console.log(this.estateId);
    this.consumptionService.activeEstateId = this.estateId;
    this.GetObjEstates(this.estateId);
    this.GetObjConsumption(null, this.estateId);
    this.UpdateYears();
  }*/

  ionViewWillEnter() {
    console.log("ionViewWillEnter used");
    this.urlId = this.activatedRoute.snapshot.paramMap.get("id");
    if (!this.urlId) {
      this.estateId = this.consumptionService.activeEstateId;
    } else {
      this.estateId = this.urlId;
    }
    console.log(this.estateId);
    this.consumptionService.activeEstateId = this.estateId;
    this.GetObjEstates(this.estateId);
    this.GetObjConsumption(null, this.estateId);
    this.loadmap();
    this.getCoordinates();

    //this.UpdateYears();
  }

  ionViewWillLeave() {
    this.estate_map.off();
    this.estate_map.remove();
  }

  printWanted() {
    console.log(this.consumptionService.activeEstateYearlyConsumption);
  }

  async GetObjEstates(id: string) {
    this.selectedEstate = await this.consumptionService.getEstates(id);
    console.log(this.selectedEstate);
  }
  /*
  GetObjEstates(id: string) {
    this.consumptionService.GetObservableEstates(id).subscribe(data => {
      this.selectedEstate = data;
      console.log(this.selectedEstate);
    });
  }
  */

  async GetObjConsumption(year: string, id: string) {
    this.consumptionService.activeEstateYearlyConsumption = await this.consumptionService.getYears(
      year,
      id
    );
    console.log("GetObjConsumption used");
    console.log(this.consumptionService.activeEstateYearlyConsumption);
    this.UpdateYears();
  }
  /*
  async GetObjConsumption(year: string, id: string) {
    await this.consumptionService
      .GetObservableYears(year, id)
      .subscribe(data => {
        this.consumptionService.activeEstateYearlyConsumption = data;
        //console.log(this.yearsConsumption);
      });
  } */

  UpdateYears() {
    //let estateYearConsumption = {};
    console.log(this.consumptionService.activeEstateYearlyConsumption);
    for (let part of this.consumptionService.activeEstateYearlyConsumption) {
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

  loadmap() {
    this.estate_map = leaflet.map("estate_map").fitWorld();
    leaflet
      .tileLayer(
        "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox.streets",
          accessToken: this.myToken
        }
      )
      .addTo(this.estate_map);

    this.estate_map
      .locate({
        setView: true,
        maxZoom: 10
      })
      .on("locationfound", e => {
        console.log("found you");
        let markerGroup = leaflet.featureGroup();
        let marker: any = leaflet
          .marker([e.latitude, e.longitude])
          .on("click", () => {
            alert("You are here");
          });
        markerGroup.addLayer(marker);
        this.estate_map.addLayer(markerGroup);
      })
      .on("locationerror", err => {
        alert(err.message);
      });
  }

  async searchEstateSync(address) {
    const results = await provider.search({ query: address });
    //this.testResult = results;
    //console.log(results);
    return results;
  }

  async getCoordinates() {
    let coordinate = await this.searchEstateSync(
      this.selectedEstate.property_address +
        " " +
        this.selectedEstate.postal_code +
        " " +
        this.selectedEstate.postal_area
    );
    console.log("Now comes the coordinates");
    console.log(coordinate);
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
