import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private navigation:NavigationService,
              private httpService: HttpClientService) { }

  public login(username : string, password : string) {
    let posts:any;
    this.httpService.post({username: username, password: password, action: 'login'},
     'http://192.168.0.192:80/Auction-App/index.php').subscribe(
        (response) => { posts = response; 
          console.log(response);
          this.setUser(username);
            this.navigation.display("LoginAction");
            this.navigation.display("Auctions");
        },
        (error) => { console.log(error); });
  }

  public logout()
  {
    this.httpService.post({action: 'logout'},
     'http://192.168.0.192:80/Auction-App/index.php?action=true').subscribe(
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
