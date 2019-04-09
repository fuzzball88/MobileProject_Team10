import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { ConsumptionService } from "../../consumption.service";
import leaflet from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";

// setup
const provider = new OpenStreetMapProvider();
@Component({
  selector: "app-map-page",
  templateUrl: "./map-page.page.html",
  styleUrls: ["./map-page.page.scss"]
})
export class MapPagePage implements OnInit {
  @ViewChild("map") mapContainer: ElementRef;
  map: any;
  myToken: string =
    "pk.eyJ1IjoiZnV6emJhbGw4OCIsImEiOiJjanRzaWFvMmswd2VnNGRvN29paTJtaHQzIn0.rwgnQNkKUE2I5YC75g3nqw";
  locations: string[] = [];

  estateData: any;
  modifiedData: any;
  districts: string[] = [];
  purposes: string[] = [];
  id: string;
  inputId: string;
  value: string = null;
  test: string = "Finland";
  testResult: any;
  testArray: any = [];

  constructor(private consumptionService: ConsumptionService) {}

  ngOnInit() {
    this.consumptionService.GetObservableEstates().subscribe(data => {
      console.log(data);
      this.consumptionService.allEstates = data;
    });
  }

  ionViewWillEnter() {
    this.loadmap();
  }

  ionViewWillLeave() {
    //this.map.off();
    //this.map.remove();
  }

  whileMarkers() {
    this.consumptionService.allEstates.forEach(async element => {
      let coordinate = await this.searchEstateSync2(
        element.property_address +
          " " +
          element.postal_code +
          " " +
          element.postal_area
      );
      /*
      estateData["property_id"] = element.property_id;
      estateData["property_name"] = element.property_name;
      estateData["propert_address"] = element.property_address;
      estateData["postal_code"] = element.postal_code;
      estateData["postal_area"] = element.postal_area;
      estateData["x"] = coordinate[0].x;
      estateData["y"] = coordinate[0].y;
        */
      leaflet
        .marker([coordinate[0].y, coordinate[0].x])
        .addTo(this.map)
        .bindPopup(
          "<h1>" +
            element.property_name +
            '</h1></br><ion-button class="marker-link" href="/tabs/tab3/map-page/estate-info-id/' +
            element.property_id +
            '">Open</ion-button>'
        );
    });
  }

  async searchEstateSync2(address) {
    return await provider.search({ query: address });
  }

  async searchEstateSync3(address) {
    await provider.search({ query: address }).then(function(result) {
      return result;
    }),
      function(error) {
        console.log("Error occured" + error);
      };
  }

  loadmap() {
    this.map = leaflet.map("map").fitWorld();
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
      .addTo(this.map);

    var myIcon = new leaflet.Icon({
      iconUrl:
        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    this.map
      .locate({
        setView: true,
        maxZoom: 30
      })
      .on("locationfound", e => {
        console.log("found you");
        let markerGroup = leaflet.featureGroup();
        let marker: any = leaflet
          .marker([e.latitude, e.longitude], { icon: myIcon })
          .on("click", () => {
            alert("You are here");
          });
        markerGroup.addLayer(marker);
        this.map.addLayer(markerGroup);
      })
      .on("locationerror", err => {
        alert(err.message);
      });
    this.whileMarkers();
  }
}
