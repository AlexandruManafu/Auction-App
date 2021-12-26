import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { WindowToggleService } from 'src/app/services/window-toggle.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private loginService: LoginService,
              private windowToggle : WindowToggleService) { }

  ngOnInit(): void {
    if(!this.loginService.isLoggedInLocal())
      this.windowToggle.setWhatToDisplay("Auctions");
    console.log("here");
  }

}
