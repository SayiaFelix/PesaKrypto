import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {
visible :boolean=true;

  constructor() {
    this.visible
   }
  hide(){this.visible = false;}
  show(){this.visible = true;}
  doSomething(){}
}
