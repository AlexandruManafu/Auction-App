import { Injectable } from '@angular/core';
import { AuctionDetails } from '../objects/AuctionDetails';
import { AuctionPreviewObject } from '../objects/AuctionPreviewObject';
import { BiddingDetails } from '../objects/BiddingDetails';

@Injectable({
  providedIn: 'root'
})
export class AuctionMockService {

  public getAuctions() : AuctionDetails[]
  {
    let preview1:AuctionPreviewObject = new AuctionPreviewObject
    (0,"/assets/images/pexels-photo-277460.jpeg","Auction0","1 January 2022", "Pocket Watch");

    let details1:BiddingDetails = new BiddingDetails
    ("Placeholder Description for the Pocket Watch asd fgh jkl zxc cbcvb",100,1000,[])

    let auction1 = new AuctionDetails(preview1,details1);

    let preview2:AuctionPreviewObject = new AuctionPreviewObject
    (1,"/assets/images/pexels-photo-277460.jpeg","Gold Necklace","1 January 2022", "Jewelry");

    let auction2 = new AuctionDetails(preview2,details1);

    let auctions:AuctionDetails[] = [];
    auctions.push(auction1);
    auctions.push(auction2);

    return auctions;

  }

  public getAuctionPreviews() : AuctionPreviewObject[]
  {
    let auctions = this.getAuctions();
    let result:AuctionPreviewObject[] = [];
    for(let i = 0; i<auctions.length;i=i+1)
    {
      result.push(auctions[i].auctionPreview);
    }

    return result;
  }

  constructor() { }
}
