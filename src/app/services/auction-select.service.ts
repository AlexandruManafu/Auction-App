import { Injectable } from '@angular/core';
import { AuctionDetails } from '../objects/AuctionDetails';
import { AuctionObject } from '../objects/AuctionObject';
import { AuctionMockService } from './auction-mock.service';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionSelectService {

  constructor(private auctionMock:AuctionMockService, private httpService : HttpClientService) { 
    this.getRemoteAuctions();
  }

  public placeholderImagePath = "/assets/images/pexels-photo-277460.jpeg"
  targetAuctionId:number = -1;


  getTargetAuction() : AuctionObject | undefined
  {
    let auctions : AuctionObject[] = this.auctionMock.auctions;
    for(let i = 0 ; i<auctions.length;i=i+1)
    {
      if(auctions[i].id == this.targetAuctionId)
        return auctions[i];
    }

    return undefined;
  }

  overrideTargetAuction(newAuction:AuctionObject): void
  {
    let auctions : AuctionObject[] = this.auctionMock.auctions;
    for(let i = 0 ; i<auctions.length;i=i+1)
    {
      if(auctions[i].id == this.targetAuctionId)
        auctions[i] = newAuction;
    }
  }

  getRemoteAuctions()
  {
    this.httpService.get(
      'http://192.168.0.192:80/Auction-App/index.php?action=getAuctions',false).subscribe(
         (response) => { 
           console.log(response);
         },
         (error) => { console.log(error); });
  }
}
