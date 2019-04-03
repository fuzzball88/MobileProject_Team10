import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import leaflet from "leaflet";
//GeoSearch import
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { ConsumptionService } from "../../consumption.service";

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
  testResult: any;
  testArray: string[] = [];

  constructor(private consumptionService: ConsumptionService) {}

  ngOnInit() {
    this.GetObjEstates();
  }

  ionViewWillLeave() {
    this.map.off();
    this.map.remove();
  }

  ionViewWillEnter() {
    this.loadmap();
  }

  GetObjEstates() {
    this.consumptionService.GetObservableEstates().subscribe(data => {
      console.log(data);
      this.consumptionService.allEstates = data;
    });
  }

  searchAddress() {
    console.log(this.searchEstate());
    //this.testArray.push(this.searchEstate());
    //this.testResult = this.searchEstate();
  }

  async estateArrays() {
    let estateData = {};
    //console.log(this.consumptionService.allEstates);

    let coordinate = await this.searchEstateSync(
      this.consumptionService.allEstates[0].property_address +
        " " +
        this.consumptionService.allEstates[0].postal_code +
        " " +
        this.consumptionService.allEstates[0].postal_area
    );

    estateData[
      "property_id"
    ] = this.consumptionService.allEstates[0].property_id;
    estateData[
      "property_name"
    ] = this.consumptionService.allEstates[0].property_name;
    estateData[
      "propert_address"
    ] = this.consumptionService.allEstates[0].property_address;
    estateData[
      "postal_code"
    ] = this.consumptionService.allEstates[0].postal_code;
    estateData[
      "postal_area"
    ] = this.consumptionService.allEstates[0].postal_area;
    estateData["x"] = coordinate[0].x;
    estateData["y"] = coordinate[0].y;

    console.log(estateData);

    //Gets info to testArray with index
    /*
    this.testArray.push(
      this.consumptionService.allEstates[0].property_id,
      this.consumptionService.allEstates[0].property_name,
      this.consumptionService.allEstates[0].property_address,
      this.consumptionService.allEstates[0].postal_code,
      this.consumptionService.allEstates[0].postal_area,
      coordinate[0].x,
      coordinate[0].y
    );
    console.log(this.testArray);
*/

    //Gets info ok
    /*
    this.consumptionService.allEstates.forEach(async element => {
      console.log(element.property_id);
      console.log(element.property_name);
      console.log(element.property_address);
      console.log(element.postal_code);
      console.log(element.postal_area);
      let coordinate = await this.searchEstateSync(
        element.property_address +
          " " +
          element.postal_code +
          " " +
          element.postal_area
      );
      console.log(coordinate);
    });
    */
  }

  async searchEstate() {
    provider
      .search({ query: "Etupääntie 2, oulu" })
      .then(async function(result) {
        return await result;
        console.log(result);
      });
  }

  async searchEstateSync(address) {
    const results = await provider.search({ query: address });
    //this.testResult = results;
    //console.log(results);
    return results;
    //this.testArray.push(results);
  }

  async markAddress() {
    //console.log(this.searchEstateSync(this.testAddress));
    let details = await this.searchEstateSync(this.testAddress);
    console.log("After");
    console.log(details);
    console.log(details[0].x);
    console.log(details[0].y);

    //console.log(this.testArray);
    //console.log(this.testArray);
    //console.log(this.testResult);
    //leaflet.marker([22, 22]).addTo(this.map);
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
