import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs';
import { AuctionObject } from '../objects/AuctionObject';
import { LoginService } from './login.service';
import { AuctionSelectService } from './auction-select.service';

@Injectable({
  providedIn: 'root'
})
export class BiddingService {

  constructor(private httpService : HttpClientService,
              private loginService : LoginService,
              private auctionSelect : AuctionSelectService) { }

  public canBid = false;
  private canBidMessageSource = new BehaviorSubject<boolean>(this.canBid)
  public canBidMessage = this.canBidMessageSource.asObservable();

  public bidAmount = 0;
  private bidAmountMessageSource = new BehaviorSubject<number>(this.bidAmount)
  public bidAmountMessage = this.bidAmountMessageSource.asObservable();

  changeCanBidMessage(message : boolean)
  {
    this.canBidMessageSource.next(message);
  }

  changeCurrentAmount(message : number)
  {
    this.bidAmountMessageSource.next(message);
  }

  private getBiddingInfoRemote(auctionId : number) : Observable<Array<Object>>
  {
    return this.httpService.getArray(
      '/Auction-App/index.php?action=getBiddingInfo&auctionId='+auctionId
      )
  }

  public updateAuctionRemote(auction : AuctionObject)
  {
    this.getBiddingInfoRemote(auction.id)
      .subscribe(
        response =>
        {
          auction.expectedEnd = new Date (response[0].toString());
          auction.initialBid = Number.parseInt(response[1].toString());
          auction.owner = response[2].toString();
          this.changeCurrentAmount(auction.initialBid);
          this.auctionSelect.changeTargetAuction(auction);
          //console.log("Remote end : "+auction.expectedEnd);
        })
  }

  public bidRemote(auction : AuctionObject)
  {
    //console.log(auction)
    return this.httpService.post(
      {
      action: 'bid',
      id : auction.id,
      initialBid : auction.initialBid,
      owner : this.loginService.getUser(),
      expectedEnd : auction.expectedEnd.toISOString(),
      },
      '/Auction-App/index.php')
  }


}
