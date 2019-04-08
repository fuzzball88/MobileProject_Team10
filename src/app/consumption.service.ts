//Data sources: https://avoindata.ouka.fi/dataset/kiinteistotiedot

//Estates: https://api.ouka.fi/v1/properties_basic_information
//-Example: https://api.ouka.fi/v1/properties_basic_information?property_id=eq.629101
//Yearly detail: https://api.ouka.fi/v1/properties_consumption_yearly
//-Example: https://api.ouka.fi/v1/properties_consumption_yearly?property_id=eq.629101&year=eq.2017
//Monthly detail: https://api.ouka.fi/v1/properties_consumption_monthly
//-Example: https://api.ouka.fi/v1/properties_consumption_monthly?property_id=eq.629101&year=eq.2017
//Heating system: https://api.ouka.fi/v1/properties_heating_systems
//-Example: https://api.ouka.fi/v1/properties_heating_systems?property_id=eq.629101
//Intended use: https://api.ouka.fi/v1/properties_intended_use
//-Example: https://api.ouka.fi/v1/properties_basic_information?intended_use=like.221%

import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";

const ESTATE_INFO = environment.estateInfo;
const YEAR_INFO = environment.yearInfo;
const MONTH_INFO = environment.monthInfo;
const HEAT_INFO = environment.heatingInfo;
const USE_INFO = environment.useInfo;

/*
const estateInfo: string =
  "https://api.ouka.fi/v1/properties_basic_information";
const yearInfo: string = "https://api.ouka.fi/v1/properties_consumption_yearly";
const monthInfo: string =
  "https://api.ouka.fi/v1/properties_consumption_monthly";
const heatingInfo: string = "https://api.ouka.fi/v1/properties_heating_systems";
const useInfo: string = "https://api.ouka.fi/v1/properties_intended_use";
*/

@Injectable({
  providedIn: "root"
})
export class ConsumptionService implements OnInit {
  activeDistrict: string = null;
  activeEstateId: string = null;
  activeEstate: any;
  activeEstateYearlyConsumption: any;
  mapEstates: string[] = [];
  allDistricts: string[] = [];
  allPurposes: string[] = [];
  allEstates: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  public ResetActiveSelections() {
    this.activeDistrict = null;
    this.activeEstateId = null;
  }

  GetObjEstate(id: string) {
    this.GetObservableEstates(id).subscribe(data => {
      this.activeEstate = data;
    });
  }

  GetObservableEstates(id?): Observable<any> {
    let address = ESTATE_INFO;
    if (id) {
      address = ESTATE_INFO + "?property_id=eq." + id;
    }
    return this.http.get(address);
  }

  GetObservableDistrictEstates(id?): Observable<any> {
    let address = ESTATE_INFO;
    if (id) {
      address = ESTATE_INFO + "?district_name=like." + id + "%";
    }
    return this.http.get(address);
  }

  public GetObservableYears(year?: string, id?: string): Observable<any> {
    let address = YEAR_INFO;
    if (year && id) {
      address += "?year=eq." + year + "&property_id=eq." + id;
    } else if (id && !year) {
      address += "?property_id=eq." + id;
    } else if (year && !id) {
      address += "?year=eq." + year;
    }
    return this.http.get(address);
  }

  //Get estates
  //Without parameter return all estates
  //With id parameter certain estate details
  public getEstates(id?: string) {
    let address = ESTATE_INFO;
    if (id) {
      address = ESTATE_INFO + "?property_id=eq." + id;
    }
    return new Promise((resolve, reject) => {
      this.http.get(address).subscribe(
        data => {
          //console.log(data)
          resolve(data);
        },
        error => {
          reject("error retrieving data from JSON.");
        }
      );
    });
  }

  //?property_id=eq.629101&year=eq.2017
  //Get Year details
  //Without parameter return all year details
  //With id parameter certain estate details with all years
  //With year get all estates info in that year
  public getYears(year?: string, id?: string) {
    let address = YEAR_INFO;
    if (year && id) {
      address += "?year=eq." + year + "&property_id=eq." + id;
    } else if (id && !year) {
      address += "?property_id=eq." + id;
    } else if (year && !id) {
      address += "?year=eq." + year;
    }

    return new Promise((resolve, reject) => {
      this.http.get(address).subscribe(
        data => {
          //console.log(data)
          resolve(data);
        },
        error => {
          reject("error retrieving data from JSON.");
        }
      );
    });
  }

  //?property_id=eq.629101&year=eq.2017
  //Get month details per year or/and per estate
  //Without parameter return all month details
  //With id parameter certain estate details with all years
  //With year get all estates info in that year
  public getMonths(year?: string, id?: string) {
    let address = MONTH_INFO;
    if (year && id) {
      address += "?year=eq." + year + "&property_id=eq." + id;
    } else if (id && !year) {
      address += "?property_id=eq." + id;
    } else if (year && !id) {
      address += "?year=eq." + year;
    }
    return new Promise((resolve, reject) => {
      this.http.get(address).subscribe(
        data => {
          //console.log(data)
          resolve(data);
        },
        error => {
          reject("error retrieving data from JSON.");
        }
      );
    });
  }

  //?property_id=eq.629101
  //Get heating system details
  //If id is used it will return that estates heating details
  public getHeatings(id?: string) {
    let address = HEAT_INFO;
    if (id) {
      address += "?property_id=eq." + id;
    }
    return new Promise((resolve, reject) => {
      this.http.get(address).subscribe(
        data => {
          //console.log(data)
          resolve(data);
        },
        error => {
          reject("error retrieving data from JSON.");
        }
      );
    });
  }

  //Get intented uses
  //With usage id get all estates with that usage
  //https://api.ouka.fi/v1/properties_intended_use
  //USAGE: https://api.ouka.fi/v1/properties_basic_information?intended_use=like.221%
  public getUses(id?: string) {
    let address = USE_INFO;
    if (id) {
      address = ESTATE_INFO + "?intended_use=like." + id + "%";
    }
    return new Promise((resolve, reject) => {
      this.http.get(address).subscribe(
        data => {
          //console.log(data)
          resolve(data);
        },
        error => {
          reject("error retrieving data from JSON.");
        }
      );
    });
  }

  public getDistricts() {
    let usageRaw = [];

    for (let part of this.allEstates) {
      if (!this.allDistricts.includes(part.district_name)) {
        this.allDistricts.push(part.district_name);
      }
    }
  }

  public getPurposes() {
    let usageRaw = [];

    for (let part of this.allEstates) {
      if (!usageRaw.includes(part.intended_use)) {
        usageRaw.push(part.intended_use);
      }
    }
    //console.log(usageRaw);
    usageRaw.forEach(element => {
      if (element === null) {
        element = "000 Muu käyttötarkoitus";
      }
      let i = element.substring(4);
      this.allPurposes.push(i);
    });
  }

  public SetEstates(id?: string) {
    //console.log(id);
    this.getEstates(id).then(
      data => {
        this.allEstates = data;
      },
      err => {
        console.log(err);
      }
    );
    console.log(this.allEstates);
  }
}
