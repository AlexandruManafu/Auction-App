import { Injectable } from '@angular/core';
import { AuctionDetails } from '../objects/AuctionDetails';
import { AuctionMockService } from './auction-mock.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionSelectService {


  constructor(private auctionMock:AuctionMockService) { }

  targetAuctionId:number = -1;


  getTargetAuction() : AuctionDetails | undefined
  {
    let auctions : AuctionDetails[] = this.auctionMock.auctions;
    for(let i = 0 ; i<auctions.length;i=i+1)
    {
      if(auctions[i].auctionPreview.id == this.targetAuctionId)
        return auctions[i];
    }

    return undefined;
    
  }

  overrideTargetAuction(newAuction:AuctionDetails): void
  {
    let auctions : AuctionDetails[] = this.auctionMock.auctions;
    for(let i = 0 ; i<auctions.length;i=i+1)
    {
      if(auctions[i].auctionPreview.id == this.targetAuctionId)
        auctions[i] = newAuction;
    }

  }
}
