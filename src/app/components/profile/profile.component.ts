import { Component, OnInit } from '@angular/core';
import { AuctionObject } from 'src/app/objects/AuctionObject';
import { AuctionMockService } from 'src/app/services/auction-mock.service';
import { LoginService } from 'src/app/services/login.service';
import { WindowToggleService } from 'src/app/services/window-toggle.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private loginService: LoginService,
              private windowToggle : WindowToggleService,
              private auctionMock : AuctionMockService) { }

  username = this.loginService.getUser();
  money = 100000
  auctionsMatrix : AuctionObject[][] = [];
  ngOnInit(): void {
    if(!this.loginService.isLoggedInLocal())
      this.windowToggle.setWhatToDisplay("Auctions");

    this.auctionsMatrix = this.makeMatrix(this.auctionMock.auctions)
  }

  makeMatrix(auctions : AuctionObject[]) : AuctionObject[][]
  {
    let result : AuctionObject[][] = [];
    for(let i = 0; i < auctions.length; i++)
    {
      let row = [];
      row.push(auctions[i]);
      if(i%2==0 && i>0)
      {
        result.push(row);
        row = [];
      }
    }
    console.log(result);
    return result;
  }

}
