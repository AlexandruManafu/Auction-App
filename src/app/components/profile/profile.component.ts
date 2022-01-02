import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuctionObject } from 'src/app/objects/AuctionObject';
import { AuctionSelectService } from 'src/app/services/auction-select.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(private loginService: LoginService,
              private auctionSelect : AuctionSelectService
              ) { }
  
  isMoneyDivVisible = false;
  username = this.loginService.getUser()
  money = "";
  money_to_add = "";
  moneySub! : Subscription
  auctions : AuctionObject[] = []

  ngOnInit(): void {
    this.auctions  = this.auctionSelect.getOwnedAuctions(this.username!)
    this.loginService.get_money(this.username)

    this.subscribeForChanges()
  }
  ngOnDestroy(): void {
    this.moneySub.unsubscribe()
  }

  subscribeForChanges()
  {
    this.moneySub = this.loginService.moneyMessage.subscribe(message => this.money = message)
  }

  add_money() {
    if (!isNaN(parseInt(this.money_to_add))) {
      this.loginService.sendMoney(this.money_to_add, this.username).subscribe(
        (response) => { 
          console.log(response);
          this.loginService.get_money(this.username)
        });;
    }
  }

}
