import { Component, Input, OnInit } from '@angular/core';
import { AuctionDetails } from 'src/app/objects/AuctionDetails';
import { AuctionSelectService } from 'src/app/services/auction-select.service';

@Component({
  selector: 'app-auction-info',
  templateUrl: './auction-info.component.html',
  styleUrls: ['./auction-info.component.css']
})
export class AuctionInfoComponent implements OnInit {

  
  constructor(private auctionSelect : AuctionSelectService) { }

  auctionObject : AuctionDetails | undefined = this.auctionSelect.getTargetAuction();

  ngOnInit(): void {
  }

}
