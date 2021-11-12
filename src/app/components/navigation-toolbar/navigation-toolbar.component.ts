import { Component, OnInit } from '@angular/core';
import { WindowToggleService } from 'src/app/services/window-toggle.service';

@Component({
  selector: 'app-navigation-toolbar',
  templateUrl: './navigation-toolbar.component.html',
  styleUrls: ['./navigation-toolbar.component.css']
})
export class NavigationToolbarComponent implements OnInit {

  constructor(private windowToggle : WindowToggleService) { }

  buttons:string[] = ["Auctions", "Create Auction", "Profile", "Login"];

  ngOnInit(): void {
  }

  display(windowName: string): void
  {
    this.windowToggle.setWhatToDisplay(windowName);
    console.log("Clicked on button: "+windowName);
  }

}
