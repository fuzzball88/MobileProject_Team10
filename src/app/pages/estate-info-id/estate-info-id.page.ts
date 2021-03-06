import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import leaflet from "leaflet";
import { ModalController, AlertController } from "@ionic/angular";
import { ConsumptionService } from "../../consumption.service";
import { ActivatedRoute } from "@angular/router";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { OvermapPage } from "../overmap/overmap.page";

const provider = new OpenStreetMapProvider();
@Component({
  selector: "app-estate-info-id",
  templateUrl: "./estate-info-id.page.html",
  styleUrls: ["./estate-info-id.page.scss"]
})
export class EstateInfoIdPage {
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
    console.log(this.estateId);
    this.consumptionService.activeEstateId = this.estateId;
    this.GetObjEstates(this.estateId);
    this.GetObjConsumption(null, this.estateId);
    //this.UpdateYears();
  }

  ionViewWillLeave() {
    /*
    this.urlId = null;
    this.estateId = null;
    this.selectedEstate = null;
    this.yearsConsumption = null;
    this.iterationYears = null;
    this.iterationYear = null;
    this.years = null;
    */
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

  async searchEstateSync(address) {
    console.log("SearchEstateSync works now");
    return await provider.search({ query: address });
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
      console.log(coordinate);
      if (
        typeof coordinate != "undefined" &&
        coordinate != null &&
        coordinate.length != null &&
        coordinate.length > 0
      ) {
        console.log("Shaibaa");
        this.openMap(coordinate[0].y, coordinate[0].x);
      } else {
        this.presentAlert();
      }
    });
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
