import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import leaflet from "leaflet";

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
  constructor() {}

  ngOnInit() {
    this.loadmap();
  }

  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet
      .tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attributions: "www.tphangout.com",
        maxZoom: 18
      })
      .addTo(this.map);
  }
}
