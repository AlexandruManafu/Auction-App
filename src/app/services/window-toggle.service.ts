import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowToggleService {

  constructor() { }

  private windowToDisplay = "Auctions";
  private refreshMessageSource = new BehaviorSubject<string>(this.windowToDisplay)
  public currentMessage = this.refreshMessageSource.asObservable();

  getWhatToDisplay():string
  {
    return this.windowToDisplay;
  }

  changeMessage(message : string)
  {
    this.refreshMessageSource.next(message);
  }

  setWhatToDisplay(newValue : string):void
  {
    if(newValue != this.windowToDisplay)
    {
      this.windowToDisplay = newValue;
      //notify component to change what to display
      this.changeMessage(newValue);
    }
  }
}
