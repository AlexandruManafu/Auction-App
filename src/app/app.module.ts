import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationToolbarComponent } from './components/navigation-toolbar/navigation-toolbar.component';
import { ActiveWindowComponent } from './components/active-window/active-window.component';
import { AuctionsWindowComponent } from './components/auctions-window/auctions-window.component';
import { WindowToggleService } from './services/window-toggle.service';
import { CreateAuctionComponent } from './components/create-auction/create-auction.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { AuctionPreviewComponent } from './components/auction-preview/auction-preview.component';
import { FormsModule } from '@angular/forms';
import { BiddingWindowComponent } from './components/bidding-window/bidding-window.component';
import { AuctionSelectService } from './services/auction-select.service';
import { AuctionInfoComponent } from './components/auction-info/auction-info.component';
import { BiddingTimeoutComponent } from './components/bidding-timeout/bidding-timeout.component';
import { BiddingService } from './services/bidding.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationToolbarComponent,
    ActiveWindowComponent,
    AuctionsWindowComponent,
    CreateAuctionComponent,
    ProfileComponent,
    LoginComponent,
    AuctionPreviewComponent,
    BiddingWindowComponent,
    AuctionInfoComponent,
    BiddingTimeoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [WindowToggleService, AuctionSelectService,BiddingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
