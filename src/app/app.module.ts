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

@NgModule({
  declarations: [
    AppComponent,
    NavigationToolbarComponent,
    ActiveWindowComponent,
    AuctionsWindowComponent,
    CreateAuctionComponent,
    ProfileComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [WindowToggleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
