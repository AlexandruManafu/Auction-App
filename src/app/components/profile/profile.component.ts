import { Component, OnInit } from '@angular/core';
import { AuctionObject } from 'src/app/objects/AuctionObject';
import { AuctionMockService } from 'src/app/services/auction-mock.service';
import { HttpClientService } from 'src/app/services/http-client.service';
import { LoginService } from 'src/app/services/login.service';
import { WindowToggleService } from 'src/app/services/window-toggle.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private loginService: LoginService,
              private auctionMock : AuctionMockService,
              private httpService: HttpClientService
              ) { }

  isMoneyDivVisible = false;
  username = this.loginService.getUser();
  money = "0";
  money_to_add = "";
  auctionsMatrix : AuctionObject[][] = [];
  ngOnInit(): void {
    this.money = this.loginService.money
    this.auctionsMatrix = this.makeMatrix(this.auctionMock.auctions)
  }

  makeMatrix(auctions : AuctionObject[]) : AuctionObject[][]
  {
    let result : AuctionObject[][] = [];
    let counter = -1;
    for(let i = 0; i < auctions.length; i++)
    {
      if (i % 2 == 0) {
        result.push([]);
        counter++;
      }
      result[counter].push(auctions[i]);
    }
    return result;
  }

  send_money(money: string, username: string|null) {
    this.httpService.post({money: money, username: username, action: 'addMoney'},
    'http://127.0.0.1:80/Auction-App/index.php').subscribe(
       (response) => { 
         console.log(response);
       },
       (error) => { console.log(error); });
 }

  add_money() {
    if (!isNaN(parseInt(this.money_to_add))) {
      this.money = (parseInt(this.money) + parseInt(this.money_to_add)).toString();
      this.send_money(this.money_to_add, this.username);
      console.log(this.loginService.money);
    }
    this.money_to_add = "";
  }

}
