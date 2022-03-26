import { Bank } from './../../shared/models/bankmodel';
import { DataService } from './../../../core/service/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {
  ifsc: any;
  bankDetails: Bank[] = [];
  bankData: Bank[];

  constructor(private route:ActivatedRoute,private apiService:DataService) {
    this.ifsc = this.route.snapshot.paramMap.get("ifsc");

  }

  ngOnInit(): void {
    this.fetchBankDetails();
  }

  fetchBankDetails(){
    this.bankDetails = this.apiService.getFromStorage(
      'local',
      'bankList'
    );
    this.bankData = this.bankDetails.filter(item => item.ifsc == this.ifsc)
    console.log(this.bankData)

  }
}
