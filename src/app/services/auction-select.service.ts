import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuctionObject } from '../objects/AuctionObject';
import { AuctionMockService } from './auction-mock.service';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionSelectService {

  auctions : AuctionObject[] = [];

  constructor(private auctionMock:AuctionMockService, private httpService : HttpClientService) { 
    this.getRemoteAuctions();
  }

  public placeholderImagePath = "/assets/images/pexels-photo-277460.jpeg"
  targetAuctionId:number = -1;

  private targetAuction :AuctionObject = this.getTargetAuction()!

  private targetMessageSource = new BehaviorSubject<AuctionObject>(this.targetAuction)
  public targetMessage = this.targetMessageSource.asObservable();

  changeTargetAuction(message : AuctionObject)
  {
    this.targetMessageSource.next(message);
  }

  getTargetAuction() : AuctionObject | undefined
  {
    for(let i = 0 ; i<this.auctions.length;i=i+1)
    {
      if(this.auctions[i].id == this.targetAuctionId)
        return this.auctions[i];
    }

    return undefined;
  }

  getOwnedAuctions(user : string)
  {
    let result : AuctionObject[] = []
    for(let i = 0 ; i<this.auctions.length;i=i+1)
    {
      if(this.auctions[i].owner == user)
        result.push(this.auctions[i])
    }
    return result
  }

  getRemoteAuctions()
  {
    this.auctions = []
    this.httpService.getArray(
      '/Auction-App/index.php?action=getAuctions').subscribe(
         (response) => { 
           console.log(response);
           for(let key in response){
              this.auctions.push(AuctionObject.createFromJson(response[key]))
           }
         },
         (error) => { console.log(error); });
  }
}
