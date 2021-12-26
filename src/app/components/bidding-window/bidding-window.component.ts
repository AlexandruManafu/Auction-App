import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuctionObject } from 'src/app/objects/AuctionObject';
import { AuctionSelectService } from 'src/app/services/auction-select.service';
import { BiddingService } from 'src/app/services/bidding.service';

@Component({
  selector: 'app-bidding-window',
  templateUrl: './bidding-window.component.html',
  styleUrls: ['./bidding-window.component.css']
})
export class BiddingWindowComponent implements OnInit,OnDestroy {

  constructor(private auctionSelect:AuctionSelectService,
              private bidding:BiddingService) { }
  
  public targetAuction! : AuctionObject;

  public canBid : boolean = this.bidding.canBid;

  public minimumBid = 0;
  public bidAmount : number = 0;

  private canBidSub! : Subscription;
  private bidAmountSub! : Subscription;

  ngOnInit(): void {
    this.targetAuction = this.auctionSelect.getTargetAuction()!;
    this.minimumBid = this.targetAuction.initialBid;
    this.bidding.changeCurrentAmount(this.minimumBid);

    this.subscribeForChanges();
  }

  subscribeForChanges()
  {
    this.canBidSub = this.bidding.canBidMessage.subscribe(message => this.canBid = message)
    this.bidAmountSub = this.bidding.bidAmountMessage.subscribe(message => this.minimumBid = message)
  }

  ngOnDestroy(){
    this.canBidSub.unsubscribe();
    this.bidAmountSub.unsubscribe();
  }

  validBid()
  {
    let amount = this.targetAuction.initialBid
    let twoPercentIncrease = amount + amount/50
    return this.canBid && this.bidAmount >= twoPercentIncrease;
  }

  onBid()
  {
    this.targetAuction.initialBid = this.bidAmount;
    this.targetAuction.resetExpectedEnd(new Date);
    this.bidding.changeCurrentAmount(this.bidAmount);
    console.log(this.minimumBid);
  }

}
