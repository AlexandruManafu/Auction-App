import { HttpClientService } from 'src/app/services/http-client.service';
import { Component, OnInit } from '@angular/core';
import { WindowToggleService } from 'src/app/services/window-toggle.service';
import { LoginService } from 'src/app/services/login.service';
import { AuctionObject } from 'src/app/objects/AuctionObject';


@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.css']
})
export class CreateAuctionComponent implements OnInit {

  public auction : AuctionObject = AuctionObject.createEmpty();
  posts : any;

  constructor(private httpService: HttpClientService,
              private loginService : LoginService,
              private windowToggle : WindowToggleService) 
  {}
  ngOnInit(): void {
  }

  handleFileSelect(imageInput: any){
    var files = imageInput.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();
        reader.onload =this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.auction.image= btoa(binaryString); //Image as Base64
  }

  create_auction(): void {
    this.auction.resetDate(this.auction.date);
    this.auction.resetExpectedEnd(this.auction.date);
    this.auction.owner = this.loginService.getUser()!;

    console.log(this.auction);
    this.httpService.post(
      {
      auction: this.auction,
      action: 'create_auction'}, 
        'http://192.168.0.192:80/Auction-App/index.php').subscribe(
          (response) => { this.posts = response; 
            console.log(response);
          },
          (error) => { console.log(error); 
        });
  }
}
