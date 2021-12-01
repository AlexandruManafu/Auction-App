import { HttpService } from 'src/app/services/http-client.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username:string="";
  password:string="";
  posts : any;
  
  login() {
    this.httpService.post({username: this.username, password: this.password, action: 'login'}, 'http://192.168.0.105:80/Auction-App/index.php').subscribe(
        (response) => { this.posts = response; 
          console.log(response);
        },
        (error) => { console.log(error); });
  }

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {

  }

}