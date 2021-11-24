import { Component, Input, OnInit } from '@angular/core';
import { AuctionDetails } from 'src/app/objects/AuctionDetails';

@Component({
  selector: 'app-auction-info',
  templateUrl: './auction-info.component.html',
  styleUrls: ['./auction-info.component.css']
})
export class AuctionInfoComponent implements OnInit {

  @Input() public auctionObject?: AuctionDetails = undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
