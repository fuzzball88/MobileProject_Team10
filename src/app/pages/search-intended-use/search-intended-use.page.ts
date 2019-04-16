import { Component, OnInit } from '@angular/core';
import { ConsumptionService } from "../../consumption.service";

@Component({
  selector: 'app-search-intended-use',
  templateUrl: './search-intended-use.page.html',
  styleUrls: ['./search-intended-use.page.scss'],
})
export class SearchIntendedUsePage implements OnInit {
  
  estateData: any;

  constructor(private consumptionService: ConsumptionService) { }

  ngOnInit() {
  this.GetObjUses();
  }

  GetObjUses() {
    this.consumptionService.GetObservableUses1().subscribe(data => {
      console.log(data);
      this.estateData = data;
      for (let i = 0; i < this.estateData.length; i++) {
        console.log(this.estateData[i].intended_use);
      }
    });
  }

  UpdateActiveUse(name: string) {
    this.consumptionService.activeUse = name;
    console.log(this.consumptionService.activeUse);
  }

}
