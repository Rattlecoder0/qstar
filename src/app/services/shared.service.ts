import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  triggerFunction = signal(false);
  
  callFunction() {
    this.triggerFunction.set(true); 
    setTimeout(() => this.triggerFunction.set(false), 0); //reset so it can be used repeatedly
  }
}
