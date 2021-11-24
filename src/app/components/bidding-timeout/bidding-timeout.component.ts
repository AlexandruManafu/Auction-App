import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bidding-timeout',
  templateUrl: './bidding-timeout.component.html',
  styleUrls: ['./bidding-timeout.component.css']
})
export class BiddingTimeoutComponent implements OnInit {

  @Input() startSeconds:number = 0; 
  public count:number = 0;

  constructor() { }

  ngOnInit(): void {
    if(this.startSeconds>0)
    {
      this.count = this.startSeconds;
      this.doCountdown();
    }

  }

  doCountdown()
  {
    setTimeout(
      ()=>{
        this.count = this.count-1;
        this.updateTimer()
      
    }, 1000) //Every second execute above
  }

  updateTimer()
  {
    console.log(this.count)
    if(this.count==0)
    {
      //Stops the setTimeout
    }else
      this.doCountdown();
  }

}
