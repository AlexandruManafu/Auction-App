import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { WindowToggleService } from 'src/app/services/window-toggle.service';

@Component({
  selector: 'app-active-window',
  templateUrl: './active-window.component.html',
  styleUrls: ['./active-window.component.css']
})
export class ActiveWindowComponent implements OnInit,OnDestroy{

  activeWindow:string = "";
  activeWindowSub! : Subscription;

  constructor(private loginService:LoginService,
              private windowToggle: WindowToggleService) { }
  
  ngOnInit(): void {
    this.activeWindowSub = this.windowToggle.currentMessage.subscribe(message => this.handleWindowChange(message))
    console.log("Created component")
  }

  handleWindowChange(message:string) : void
  {
    this.activeWindow = message
    this.redirectIfNotLoggedIn();
  }

  redirectIfNotLoggedIn()
  {
    if(!this.loginService.isLoggedInLocal() && 
      (this.activeWindow=="Profile" || this.activeWindow=="Create Auction"))
      this.windowToggle.setWhatToDisplay("Auctions");
  }

  ngOnDestroy() {
    this.activeWindowSub.unsubscribe();
  }

}
