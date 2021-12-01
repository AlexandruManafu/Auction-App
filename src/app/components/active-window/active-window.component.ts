import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WindowToggleService } from 'src/app/services/window-toggle.service';

@Component({
  selector: 'app-active-window',
  templateUrl: './active-window.component.html',
  styleUrls: ['./active-window.component.css']
})
export class ActiveWindowComponent implements OnInit,OnDestroy{

  activeWindow:string = "";
  activeWindowSub! : Subscription;

  constructor(private windowToggle: WindowToggleService) { }
  
  ngOnInit(): void {
    this.activeWindowSub = this.windowToggle.currentMessage.subscribe(message => this.activeWindow = message)
    console.log("Created component")
  }

  ngOnDestroy() {
    this.activeWindowSub.unsubscribe();
  }

}
