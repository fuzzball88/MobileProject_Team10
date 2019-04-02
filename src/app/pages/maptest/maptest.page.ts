import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import leaflet from "leaflet";
//GeoSearch import
import { OpenStreetMapProvider } from "leaflet-geosearch";

const provider = new OpenStreetMapProvider();

@Component({
  selector: "app-maptest",
  templateUrl: "./maptest.page.html",
  styleUrls: ["./maptest.page.scss"]
})
export class MaptestPage implements OnInit {
  @ViewChild("map") mapContainer: ElementRef;
  map: any;
  myToken: string =
    "pk.eyJ1IjoiZnV6emJhbGw4OCIsImEiOiJjanRzaWFvMmswd2VnNGRvN29paTJtaHQzIn0.rwgnQNkKUE2I5YC75g3nqw";
  locations: string[] = [];
  testAddress: string = "Etupääntie 2, oulu";
  constructor() {}

  ngOnInit() {}

  ionViewWillLeave() {
    this.map.off();
    this.map.remove();
  }

  ionViewWillEnter() {
    this.loadmap();
  }

  searchAddress() {
    provider.search({ query: this.testAddress }).then(function(result) {
      // do something with result;
      console.log(result);
      for (let address of result) {
        console.log(address.x);
        console.log(address.y);
        console.log(address.label);
        /*
        leaflet
          .marker([result.x, result.y])
          .addTo(this.map)
          .bindPopup(result.label)
          .openPopup();
          */
      }
    });
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

    this.map
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
            alert("Marker clicked");
          });
        markerGroup.addLayer(marker);
        this.map.addLayer(markerGroup);
      })
      .on("locationerror", err => {
        alert(err.message);
      });
  }
}
