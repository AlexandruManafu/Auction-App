import { Component, OnInit } from '@angular/core';
import { AuctionDetails } from 'src/app/objects/AuctionDetails';
import { AuctionPreviewObject } from 'src/app/objects/AuctionPreviewObject';
import { AuctionSelectService } from 'src/app/services/auction-select.service';

@Component({
  selector: 'app-bidding-window',
  templateUrl: './bidding-window.component.html',
  styleUrls: ['./bidding-window.component.css']
})
export class BiddingWindowComponent implements OnInit {

  constructor(private auctionSelect:AuctionSelectService) { }
  
  public targetAuction : AuctionDetails | undefined = undefined;

  ngOnInit(): void {
    this.targetAuction = this.auctionSelect.getTargetAuction();


    console.log(this.targetAuction?.auctionPreview.id);
    console.log(this.targetAuction?.auctionPreview.title);
  }

}
