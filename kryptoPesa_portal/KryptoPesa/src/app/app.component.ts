import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'KryptoPesa';
  isLightTheme:boolean =false


  constructor() { }
  ngOnInit(): void {
    this.isLightTheme = localStorage.getItem('theme')==="Light" ? true:false;

  }
  storedThemeSelection(){
    localStorage.setItem('theme',this.isLightTheme? "Light":"Dark");
  }
}
