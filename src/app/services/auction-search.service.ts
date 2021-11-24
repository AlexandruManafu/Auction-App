import { Injectable } from '@angular/core';
import { AuctionPreviewObject } from '../objects/AuctionPreviewObject';

@Injectable({
  providedIn: 'root'
})
export class AuctionSearchService {

  constructor() { }

  auctionSearched(auction:AuctionPreviewObject, parameter:string)
  {
    return auction.title.includes(parameter) || auction.category.includes(parameter);
  }

  getSearchedAuctions(auctions: AuctionPreviewObject[], parameter:string) : AuctionPreviewObject[]
  {
    let result : AuctionPreviewObject[] = [];

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
