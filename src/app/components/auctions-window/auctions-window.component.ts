import { Component, OnInit } from '@angular/core';
import { AuctionMockService } from 'src/app/services/auction-mock.service';
import { AuctionSearchService } from 'src/app/services/auction-search.service';
import { AuctionObject } from 'src/app/objects/AuctionObject';
import { AuctionSelectService } from 'src/app/services/auction-select.service';

@Component({
  selector: 'app-auctions-window',
  templateUrl: './auctions-window.component.html',
  styleUrls: ['./auctions-window.component.css']
})
export class AuctionsWindowComponent implements OnInit {

  constructor(private auctionSelect : AuctionSelectService,
              private auctionSearch : AuctionSearchService ) { }
  auctions : AuctionObject[] = [];
  searchParameter: string = "";
  refreshImage = "assets/images/refresh_2091540.png";

  ngOnInit(): void {
    this.auctions = this.auctionSelect.auctions

  }

  onSearchConfirm() : void
  {
    this.auctions = this.auctionSearch.getSearchedAuctions(this.auctions,this.searchParameter);
    if(this.searchParameter.length == 0)
    {
      this.auctions = this.auctionSelect.auctions
    }
  }

  onRefreshConfirm() : void
  {
    this.auctionSelect.getRemoteAuctions()
    this.auctions = this.auctionSelect.auctions
  }

}
