import { BiddingDetails } from "./BiddingDetails";
import { AuctionPreviewObject } from "./AuctionPreviewObject";
import { not } from "@angular/compiler/src/output/output_ast";

export class AuctionDetails{

    constructor(public auctionPreview:AuctionPreviewObject,
                public biddingDetails:BiddingDetails
                ){
                    this.computeExpectedEnd();
                }

    expectedEnd : Date = new Date (this.auctionPreview.date);

    // Initially the expected end of the auction is the initial date + timeout
    // At each bid increment expected end by timeout
    updateExpectedEnd(time : Date):void
    {
        this.auctionPreview.date = time;
        this.computeExpectedEnd();
    }

    computeExpectedEnd()
    {
        this.expectedEnd = new Date(this.auctionPreview.date);
        let incrementedSeconds = this.expectedEnd.getSeconds() + this.biddingDetails.timeout;
        this.expectedEnd.setSeconds(incrementedSeconds);
    }

    isStarted(time : Date):boolean
    {
        let auctionStart = this.auctionPreview.date;
        return auctionStart <= time; 
    }

    isNotOver(time : Date):boolean
    {
        let auctionEnd = this.expectedEnd.getTime();
        let timeout = this.biddingDetails.timeout * 1000;

        return time.getTime() + timeout > auctionEnd;
    }

    isContinuing(time : Date):boolean
    {
        return this.isStarted(time) && this.isNotOver(time);
    }

    getRemainingTime(time : Date) : number
    {
        let resultMiliseconds = this.expectedEnd.getTime() - time.getTime();
        return Math.trunc(resultMiliseconds/1000);
    }

    

}