import { Injectable } from '@angular/core';
import { AuctionDetails } from '../objects/AuctionDetails';
import { AuctionPreviewObject } from '../objects/AuctionPreviewObject';
import { BiddingDetails } from '../objects/BiddingDetails';

@Injectable({
  providedIn: 'root'
})
export class AuctionMockService {

  auctions:AuctionDetails[] = [];

  constructor() {
    this.buildAuctions();
  }

  public deepCopy(object:any)
  {
    return JSON.parse(JSON.stringify(object));
  }


  public buildAuctions()
  {
    let preview1:AuctionPreviewObject = new AuctionPreviewObject
    (0,"/assets/images/pexels-photo-277460.jpeg","Auction0", new Date, "Pocket Watch");

    let details1:BiddingDetails = new BiddingDetails
    ("Placeholder Description for the Pocket Watch asd fgh jkl zxc cbcvb",20,1000)

    let auction1 = new AuctionDetails(preview1,details1);

    let preview2:AuctionPreviewObject = new AuctionPreviewObject
    (1,"/assets/images/pexels-photo-277460.jpeg","Gold Necklace", new Date, "Jewelry");

    preview2.date.setSeconds(preview2.date.getSeconds() + 100);

    let auction2 = new AuctionDetails(preview2,this.deepCopy(details1));

    this.auctions.push(auction1);
    this.auctions.push(auction2);

  }

  public getAuctionPreviews() : AuctionPreviewObject[]
  {
    let result:AuctionPreviewObject[] = [];
    for(let i = 0; i<this.auctions.length;i=i+1)
    {
      result.push(this.auctions[i].auctionPreview);
    }

    return result;
  }
}
