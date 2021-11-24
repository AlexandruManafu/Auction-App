import { BiddingDetails } from "./BiddingDetails";
import { AuctionPreviewObject } from "./AuctionPreviewObject";

export class AuctionDetails{

    constructor(public auctionPreview:AuctionPreviewObject,
                public biddingDetails:BiddingDetails
                ){}

}