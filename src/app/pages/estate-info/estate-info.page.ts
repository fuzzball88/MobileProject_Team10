import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import leaflet from "leaflet";
import { ModalController, AlertController } from "@ionic/angular";
import { ConsumptionService } from "../../consumption.service";
import { ActivatedRoute } from "@angular/router";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { OvermapPage } from "../overmap/overmap.page";

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
  coordinates: any;

  constructor(
    private consumptionService: ConsumptionService,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private alertController: AlertController
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
    console.log("Estate id has been selected");
    console.log(this.estateId);
    //this.selectedEstate = this.consumptionService.getEstates(this.estateId);
    this.consumptionService.activeEstateId = this.estateId;
    this.GetObjEstates(this.estateId);
    this.GetObjConsumption(null, this.estateId);
    //this.loadmap();

    //this.UpdateYears();
  }

  ionViewWillLeave() {
    //this.estate_map.off();
    //this.estate_map.remove();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Address cannot be found",
      message: "The address of this estate cannot be shown.",
      buttons: ["OK"]
    });

    await alert.present();
  }

  async openMap(y, x) {
    const modal = await this.modalController.create({
      component: OvermapPage,
      componentProps: {
        y: y,
        x: x
        //mapcoordinates: this.coordinates
      }
    });
    modal.present();
  }

  printWanted() {
    console.log(this.consumptionService.activeEstateYearlyConsumption);
  }

  async GetObjEstates(id: string) {
    this.selectedEstate = await this.consumptionService.getEstates(id);
    console.log(this.selectedEstate);
    console.log(this.selectedEstate[0].property_address);
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

  async searchEstateSync(address) {
    console.log("SearchEstateSync works now");
    return await provider.search({ query: address });
  }

  async getCoordinates() {
    let coordinate = await this.searchEstateSync(
      this.selectedEstate[0].property_address +
        " " +
        this.selectedEstate[0].postal_code +
        " " +
        this.selectedEstate[0].postal_area
    );
    console.log("Coordinates come now");
    console.log(coordinate);
  }

  forMap() {
    this.selectedEstate.forEach(async element => {
      let coordinate = await this.searchEstateSync(
        element.property_address +
          " " +
          element.postal_code +
          " " +
          element.postal_area
      );
      coordinate.then(
        result => console.log(result),
        error => console.log(error)
      );
    });
  }
  /*
    this.selectedEstate.forEach(async element => {
      let coordinate = await this.searchEstateSync(
        element.property_address +
          " " +
          element.postal_code +
          " " +
          element.postal_area
      );
      console.log(coordinate[0]);
      if ((coordinate[0] = undefined)) {
        this.presentAlert();
      }
      this.openMap(coordinate[0].y, coordinate[0].x);
    });
  }
  */

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
