import { Injectable } from '@angular/core';
import { AuctionObject } from '../objects/AuctionObject';

@Injectable({
  providedIn: 'root'
})
export class AuctionMockService {

  auctions:AuctionObject[] = [];

  constructor() {
    this.buildAuctions();
  }

  public deepCopy(object:any)
  {
    return JSON.parse(JSON.stringify(object));
  }

  public buildAuctions()
  {
    let description1 = "Placeholder Description for the Pocket Watch asd fgh jkl zxc cbcvb"

    let auction1 = new AuctionObject(0,"","Auction0", new Date, new Date, "Pocket Watch",
    description1,40,1000,"user")
    let auction2 = new AuctionObject(1,"","Gold Necklace", new Date, new Date, "Jewelry",
    description1,40,1000,"user1")

    auction1.incrementExpectedEnd()
    auction1.incrementExpectedEnd()
    auction2.incrementExpectedEnd()
    this.auctions.push(auction1)
    this.auctions.push(auction2)
  }
}
