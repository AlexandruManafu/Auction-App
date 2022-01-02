import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private navigation: NavigationService,
    private httpService: HttpClientService) {

    if(this.user!)
      this.get_money(this.user)

    }
  private user = "";
  private money = "0"
  private moneyMessageSource = new BehaviorSubject<string>(this.money)
  public moneyMessage = this.moneyMessageSource.asObservable();

  changeLocalMoney(message : string)
  {
    this.moneyMessageSource.next(message);
  }

  public get_money(username:string|null) {
    this.httpService.get(
    '/Auction-App/index.php?action=getMoney&user=' + username,true).subscribe(
         (response) => { 
           console.log(response);
           this.changeLocalMoney(response.toString())
         });
      /*
      },
      (error) => { console.log(error); }
      */
  }

  sendMoney(money: string, username: string|null)
  {
    return this.httpService.post(
    {money: money,username: username, action: 'addMoney'},
    '/Auction-App/index.php')
 }

 loginRegister(username:string, password:string, action:string) {
  return this.httpService.post(
    {
    username: username,
    password: password,
    action: action.toLocaleLowerCase()
    }, 
      '/Auction-App/index.php')
}

  public logout()
  {
    this.httpService.post({action: 'logout'},
    '/Auction-App/index.php?action=true').subscribe(
        (response) => { 
          console.log(response);
          if (response.body == 'logouthere') {
            this.unsetUser()
            this.navigation.display("Logout");
            this.navigation.display("Auctions");
          }
        });
  }

  public setUser(user : string) : void
  {
    this.user = user;
    localStorage.setItem("user",  user);
  }

  public getUser() : string | null
  {
    if(this.user != "")
      return this.user
    else
      return localStorage.getItem("user")
  }


  public unsetUser(): void
  {
    this.user = "";
    localStorage.removeItem("user");
  }

  public isLoggedInLocal(): boolean
  {
    return this.getUser() != null;
  }
  
}
