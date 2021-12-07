import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from './login.service';
import { WindowToggleService } from './window-toggle.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  displayLogout : boolean = false;
  displayLogoutSub! : Subscription;

  buttons:string[] = []

  constructor(private windowToggle : WindowToggleService) {

    this.buttons = ["Auctions", "Create Auction", "Profile", "Login"];

    if(this.isLoggedInLocal())
    {
      this.display("LoginAction")
    }
    else
    {
      this.display("Logout")
    }


   }

  public isLoggedInLocal(): boolean
  {
    let result = localStorage.getItem("user")
    return result != null;
  }


  public display(windowName: string): void
  {
    if(windowName == "Logout")
    {
      this.buttons.pop();
      this.buttons.push("Login")
    }
    else if(windowName == "LoginAction")
    {
      this.buttons.pop();
      this.buttons.push("Logout")
    }
    else
    {
      this.windowToggle.setWhatToDisplay(windowName);
      console.log("Clicked on button: "+windowName);
    }
  }
}
