import { HttpClientService } from 'src/app/services/http-client.service';
import { Component, OnInit } from '@angular/core';


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
  posts : any;
  
  constructor(private httpService: HttpClientService) { }

  switchToRegister() {
    this.action = this.action == "Login" ? "Register": "Login";
    this.switch_text = this.switch_text == "Don't have an account? Register now!"? "Allready have an account? Login here": "Don't have an account? Register now!";
  }

  login() {
    this.httpService.post({username: this.username, password: this.password, action: this.action.toLocaleLowerCase()}, 'http://127.0.0.1:80/Auction-App/index.php').subscribe(
        (response) => { this.posts = response; 
          console.log(response);
        },
        (error) => { console.log(error); });
  }


  ngOnInit(): void { }

}