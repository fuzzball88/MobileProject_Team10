import { Component, OnInit } from '@angular/core';
import { ConsumptionService } from "../../consumption.service";

@Component({
  selector: 'app-search-by-intended-use',
  templateUrl: './search-by-intended-use.page.html',
  styleUrls: ['./search-by-intended-use.page.scss'],
})
export class SearchByIntendedUsePage implements OnInit {
  estateData: any;

  constructor(private consumptionService: ConsumptionService) { }

  ngOnInit() {
    this.GetObjEstatesByUse(this.consumptionService.activeUse);
    console.log(this.consumptionService.activeUse);
  }

  //hakee valitun käyttötarkoituksen mukaiset rakennukset
  GetObjEstatesByUse(use: string) {
    this.consumptionService
      .GetObservablesUsesID(use)
      .subscribe(data => {
        console.log(data);
        this.estateData = data;
      });
  }



}
