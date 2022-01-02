import { HttpClientService } from 'src/app/services/http-client.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NavigationService } from 'src/app/services/navigation.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username:string="";
  password:string="";
  action:string = "Login";
  switch_text:string = "Don't have an account? Register now!";
  
  constructor(private loginService : LoginService, private navigation : NavigationService) { }
  
  switchToRegister() {
    this.action = this.action == "Login" ? "Register": "Login";
    this.switch_text = this.switch_text == "Don't have an account? Register now!"? "Allready have an account? Login here": "Don't have an account? Register now!";
  }
  
  ngOnInit(): void { }
  
  login()
  {
    this.loginService.loginRegister(this.username, this.password, this.action).subscribe(
      (response) => {
        if (response.body == 'loginto do' || response.body == 'login') {
          this.loginService.setUser(this.username);
          this.navigation.display("LoginAction");
          this.navigation.display("Auctions");
        }
        else if(response.body == "registerNew record created successfully")
        {
          this.username = ""
          this.password = ""
        }
        console.log(response);
      });
  }

}