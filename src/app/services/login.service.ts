import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public money = "0"

  constructor(private navigation:NavigationService,
              private httpService: HttpClientService) { }

  public login(username : string, password : string) {
    let posts:any;
    this.httpService.post({username: username, password: password, action: 'login'},
     'http://127.0.0.1:80/Auction-App/index.php').subscribe(
        (response) => { posts = response; 
          console.log(response);
          this.setUser(username);
          //this.get_money(username);
          this.navigation.display("LoginAction");
          this.navigation.display("Auctions");
        },
        (error) => { console.log(error); });
  }

  public get_money(username:string|null) {
    console.log("username: " + username);
    this.httpService.get(
      'http://127.0.0.1:80/Auction-App/index.php?action=getMoney&user=' + username,true).subscribe(
         (response) => { 
           console.log(response);
           this.money = response.toString();
         },
         (error) => { console.log(error); });
  }

  public logout()
  {
    this.httpService.post({action: 'logout'},
     'http://127.0.0.1:80/Auction-App/index.php?action=true').subscribe(
        (response) => { 
          console.log(response);
          if (response.body == 'logouthere') {
            this.unsetUser()
            this.navigation.display("Logout");
          }
        },
        (error) => { console.log(error); });
  }

  public setUser(user : string) : void
  {
    localStorage.setItem("user",  user);
  }

  public getUser() : string | null
  {
    this.get_money(localStorage.getItem("user"));
    return localStorage.getItem("user");
  }

  public unsetUser(): void
  {
    localStorage.removeItem("user");
  }

  public isLoggedInLocal(): boolean
  {
    return this.getUser() != null;
  }
  
}
