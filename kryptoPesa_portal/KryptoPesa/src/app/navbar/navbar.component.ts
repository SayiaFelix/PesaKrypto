import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { LoadingService } from '../service/loading.service';
import { NavService } from '../service/nav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLightTheme: boolean = true
  loading$ = this.loader.loading$;
  coinData: any = [];

  constructor(private apiCoin: ApiService,
    public nav: NavService,
    private loader: LoadingService
  ) { }

  ngOnInit(): void {
    this.getCoinData();
    this.isLightTheme = localStorage.getItem('theme') === "Light" ? true : false;
  }
  
  storedThemeSelection() {
    localStorage.setItem('theme', this.isLightTheme ? "Light" : "Dark");
  }

  getCoinData() {
    this.apiCoin.getCurrencyTrending()
      .subscribe(res => {
        console.log(res)
        this.coinData = res
      })
  }
}
