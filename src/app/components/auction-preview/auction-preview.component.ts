import { Component, OnInit, Input } from '@angular/core';
import { AuctionObject } from 'src/app/objects/AuctionObject';
import { AuctionSelectService } from 'src/app/services/auction-select.service';
import { WindowToggleService } from 'src/app/services/window-toggle.service';

@Component({
  selector: 'app-auction-preview',
  templateUrl: './auction-preview.component.html',
  styleUrls: ['./auction-preview.component.css']
})
export class AuctionPreviewComponent implements OnInit {

  @Input() previewObject?: AuctionObject = undefined;
  image : string = "data:image/png;base64,";

  constructor(public auctionSelect:AuctionSelectService,
              private windowToggle: WindowToggleService) { }

  ngOnInit(): void {
    this.image += this.previewObject?.image;
  }

  selectAuction():void
  {
    if(this.previewObject != undefined)
    {
      this.auctionSelect.targetAuctionId = this.previewObject.id;
      this.auctionSelect.changeTargetAuction(this.previewObject)
      this.windowToggle.setWhatToDisplay("Bidding");
    }
  }

}
