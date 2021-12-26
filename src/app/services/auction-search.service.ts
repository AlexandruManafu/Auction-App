import { Injectable } from '@angular/core';
import { AuctionObject } from '../objects/AuctionObject';

@Injectable({
  providedIn: 'root'
})
export class AuctionSearchService {

  constructor() { }

  auctionSearched(auction:AuctionObject, parameter:string)
  {
    return auction.title.includes(parameter) || auction.category.includes(parameter);
  }

  getSearchedAuctions(auctions: AuctionObject[], parameter:string) : AuctionObject[]
  {
    let result : AuctionObject[] = [];

    for(let i = 0;i<auctions.length;i++)
    {
      if(this.auctionSearched(auctions[i],parameter))
      {
        result.push(auctions[i]);
      }
    }

    return result;
  }
}
