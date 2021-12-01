import { Component, Input, OnInit } from '@angular/core';
import { AuctionDetails } from 'src/app/objects/AuctionDetails';
import { AuctionSelectService } from 'src/app/services/auction-select.service';
import { BiddingService } from 'src/app/services/bidding.service';

@Component({
  selector: 'app-bidding-timeout',
  templateUrl: './bidding-timeout.component.html',
  styleUrls: ['./bidding-timeout.component.css']
})
export class BiddingTimeoutComponent implements OnInit {


  constructor(private auctionSelect: AuctionSelectService,
              private bidding: BiddingService) { }

  private auction : AuctionDetails = this.auctionSelect.getTargetAuction()!;
  public count:number = 0;
  public auctionContinuing = true;

  ngOnInit(): void {

    if(this.count>= 0)
    {
      this.doCountdown();
    }
    else
    {
      this.count = 0
    }

  }
  ngOnDestroy()
  {
    this.count = -1;
  }

  // The Starting time for the counter in seconds
  // is the integer part of expectedEnd - currentTime / 1000
  processCount()
  {
    console.log(this.count);
    if(this.count < 0)
    {
      this.bidding.changeCanBidMessage(false);
    }
    else
    {
      let rightNow : Date = new Date;
      this.auctionContinuing = this.auction.isContinuing(rightNow);

      if(this.auctionContinuing)
        this.bidding.changeCanBidMessage(true);

      this.count = this.auction.getRemainingTime(rightNow);
      this.doCountdown();
    }
  }

  doCountdown()
  {
    setTimeout(
      ()=>{
      
      this.processCount();
    }, 1000) //Every second execute above
  }
  

}
