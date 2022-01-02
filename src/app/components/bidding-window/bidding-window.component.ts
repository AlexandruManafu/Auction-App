import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuctionObject } from 'src/app/objects/AuctionObject';
import { AuctionSelectService } from 'src/app/services/auction-select.service';
import { BiddingService } from 'src/app/services/bidding.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-bidding-window',
  templateUrl: './bidding-window.component.html',
  styleUrls: ['./bidding-window.component.css']
})
export class BiddingWindowComponent implements OnInit,OnDestroy {

  constructor(private auctionSelect: AuctionSelectService,
              private biddingService: BiddingService,
              private loginService : LoginService) { }
  
  public targetAuction! : AuctionObject;

  public canBid : boolean = this.biddingService.canBid;
  private userMoney : string = "0";

  public minimumBid = 0;
  public bidAmount : number = 0;

  private canBidSub! : Subscription;
  private bidAmountSub! : Subscription;
  private moneySub! : Subscription;
  private targetAuctionSub! : Subscription;

  ngOnInit(): void {
    this.targetAuction = this.auctionSelect.getTargetAuction()!;
    this.minimumBid = this.targetAuction.initialBid;
    let user = this.loginService.getUser();
    if(user!)
      this.loginService.get_money(this.loginService.getUser())

    this.subscribeForChanges();
  }

  subscribeForChanges()
  {
    this.targetAuctionSub = this.auctionSelect.targetMessage.subscribe(message => this.targetAuction = message)
    this.moneySub = this.loginService.moneyMessage.subscribe(message => this.userMoney = message)
    this.canBidSub = this.biddingService.canBidMessage.subscribe(message => this.canBid = message)
    this.bidAmountSub = this.biddingService.bidAmountMessage.subscribe(message => this.minimumBid = message)
  }

  ngOnDestroy(){
    this.targetAuctionSub.unsubscribe();
    this.moneySub.unsubscribe();
    this.canBidSub.unsubscribe();
    this.bidAmountSub.unsubscribe();
  }

  validBid()
  {
    let notOwner = this.loginService.getUser() != this.targetAuction.owner
    let amount = this.targetAuction.initialBid
    let twoPercentIncrease = amount + amount/50
    let hasMoney = Number.parseInt(this.userMoney) >= this.bidAmount
    return this.canBid && notOwner && hasMoney && this.bidAmount >= twoPercentIncrease;
  }

  onBid()
  {
    let afterBid : AuctionObject = AuctionObject.deepCopy(this.targetAuction)
    afterBid.resetExpectedEnd(new Date);
    afterBid.initialBid = this.bidAmount

    this.biddingService.bidRemote(afterBid).subscribe(
      response => 
      {
        console.log(response)
      })
  }

}
