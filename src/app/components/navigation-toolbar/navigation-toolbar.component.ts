import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { WindowToggleService } from 'src/app/services/window-toggle.service';

@Component({
  selector: 'app-navigation-toolbar',
  templateUrl: './navigation-toolbar.component.html',
  styleUrls: ['./navigation-toolbar.component.css']
})
export class NavigationToolbarComponent implements OnInit,OnDestroy {

  buttons :string[]=[]

  constructor(public navigation:NavigationService, private loginService : LoginService) { }

  ngOnInit(): void {
    this.buttons = this.navigation.buttons;
  }

  ngOnDestroy(): void{
    
  }

  display(action: string)
  {
    if(action=="Logout")
    {
      this.loginService.logout();
    }
    else
      this.navigation.display(action);
  }
  
  

}
