import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import leaflet from "leaflet";
import { Map, latLng, tileLayer, Layer, marker } from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { NavParams, ModalController } from "@ionic/angular";

const provider = new OpenStreetMapProvider();

@Component({
  selector: "app-overmap",
  templateUrl: "./overmap.page.html",
  styleUrls: ["./overmap.page.scss"]
})
export class OvermapPage implements OnInit {
  @ViewChild("estate_map") mapContainer: ElementRef;
  estate_map: Map;
  coordinates: string[] = [];
  testX: string = "";
  testY: string = "";
  myToken: string =
    "pk.eyJ1IjoiZnV6emJhbGw4OCIsImEiOiJjanRzaWFvMmswd2VnNGRvN29paTJtaHQzIn0.rwgnQNkKUE2I5YC75g3nqw";

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    //this.loadmap();
    //this.getCoordinates();
  }

  ionViewWillEnter() {
    this.testX = this.navParams.get("x");
    this.testY = this.navParams.get("y");
    this.loadmap();
  }

  ionViewWillLeave() {
    this.estate_map.off();
    this.estate_map.remove();
  }

  closeMap() {
    this.modalController.dismiss();
  }

  fixMap() {
    this.estate_map.invalidateSize();
  }

  loadmap() {
    setTimeout(() => {
      //this.estate_map = leaflet.map("estate_map").fitWorld();
      this.estate_map = new Map("estate_map").setView(
        [this.testY, this.testX],
        13
      );
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
      leaflet.marker([this.testY, this.testX]).addTo(this.estate_map);
    }, 50);

    //leaflet.marker([this.testY, this.testX]).addTo(this.estate_map);
  }

  /*
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
    return coordinate;
    console.log("Now comes the coordinates");
    console.log(coordinate);
  }
  */
}
