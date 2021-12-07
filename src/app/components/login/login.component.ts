import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NavigationService } from 'src/app/services/navigation.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private navigation: NavigationService, private loginService : LoginService) { }

  username:string="";
  password:string="";

  ngOnInit(): void {

  }

  login()
  {
    this.loginService.login(this.username,this.password);
    this.username = "";
    this.password = "";
  }

}