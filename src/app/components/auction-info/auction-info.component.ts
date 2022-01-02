import { Component, OnInit } from '@angular/core';
import { AuctionObject } from 'src/app/objects/AuctionObject';
import { AuctionSelectService } from 'src/app/services/auction-select.service';

@Component({
  selector: 'app-auction-info',
  templateUrl: './auction-info.component.html',
  styleUrls: ['./auction-info.component.css']
})
export class AuctionInfoComponent implements OnInit {

  image : string = "data:image/png;base64,";
  constructor(public auctionSelect : AuctionSelectService) { }

  auctionObject : AuctionObject | undefined = this.auctionSelect.getTargetAuction();

  ngOnInit(): void {
    if(this.auctionObject!)
      this.image += this.auctionObject.image;
  }

}
