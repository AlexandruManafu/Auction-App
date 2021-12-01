import { HttpService } from 'src/app/services/http-client.service';
import { Component, OnInit } from '@angular/core';
import { WindowToggleService } from 'src/app/services/window-toggle.service';

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.css']
})
export class CreateAuctionComponent implements OnInit {

  auction_title:string="";
  starting_price:string="";
  timeout:string = "";
  category:string = "";
  item_description:string = "";
  start_date = "";
  posts : any;
  image_as_base64:string = "";

  constructor(private httpService: HttpService, private windowToggle : WindowToggleService) { }

  ngOnInit(): void {
    this.httpService.post({action: 'islogged'}, 'http://192.168.0.105:80/Auction-App/index.php?action=true').subscribe(
        (response) => { 
          console.log(response);
          if (response.body == 'no') {
            this.windowToggle.setWhatToDisplay('Login');
          }
        },
        (error) => { console.log(error); });
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
    this.image_as_base64= btoa(binaryString);
  }

  create_auction(): void {
    this.httpService.post(  {
      auction_title: this.auction_title, 
      starting_price: this.starting_price,
      timeout: this.timeout,
      category: this.category,
      start_date: this.start_date,
      item_description: this.item_description,
      image: this.image_as_base64, action: 'create_auction'}, 
        'http://192.168.0.105:80/Auction-App/index.php').subscribe(
          (response) => { this.posts = response; 
            console.log(response);
          },
          (error) => { console.log(error); 
        });
  }
}
