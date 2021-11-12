import { Component, OnInit } from '@angular/core';
import { WindowToggleService } from 'src/app/services/window-toggle.service';

@Component({
  selector: 'app-active-window',
  templateUrl: './active-window.component.html',
  styleUrls: ['./active-window.component.css']
})
export class ActiveWindowComponent implements OnInit {

  activeWindow:string = "";

  constructor(private windowToggle: WindowToggleService) { }
  
  ngOnInit(): void {
    this.windowToggle.currentMessage.subscribe(message => this.activeWindow = message)
    console.log("Created component")
  }

}
