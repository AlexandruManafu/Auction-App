import { Component, OnInit } from '@angular/core';
import { AuctionPreviewObject } from 'src/app/objects/AuctionPreviewObject';
import { FormsModule } from '@angular/forms';
import { AuctionMockService } from 'src/app/services/auction-mock.service';
import { AuctionSearchService } from 'src/app/services/auction-search.service';
import { AuctionObject } from 'src/app/objects/AuctionObject';

@Component({
  selector: 'app-auctions-window',
  templateUrl: './auctions-window.component.html',
  styleUrls: ['./auctions-window.component.css']
})
export class AuctionsWindowComponent implements OnInit {

  constructor(private auctionMock : AuctionMockService,
              private auctionSearch : AuctionSearchService ) { }
  auctions : AuctionObject[] = [];
  searchParameter: string = "";

  ngOnInit(): void {
    this.auctions = this.auctionMock.auctions
    console.log(this.auctions[0].image.length);

  }

  onSearchConfirm() : void
  {
    this.auctions = this.auctionSearch.getSearchedAuctions(this.auctions,this.searchParameter);
    if(this.searchParameter.length == 0)
    {
      this.auctions = this.auctionMock.auctions
    }
  }

}
