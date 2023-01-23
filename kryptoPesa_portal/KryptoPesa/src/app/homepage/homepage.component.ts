import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NavService } from '../service/nav.service';
import { LoadingService } from '../service/loading.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  loading$ = this.loader.loading$;
  coinData: any = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'current_price', 'price_change_percentage_24h', 'circulating_supply', 'market_cap'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private apiCoin: ApiService,
    private router: Router,
    private home: NavService,
    private loader: LoadingService
  ) { }

  ngOnInit(): void {
    this.getCurrencyData();
    this.home.show()

  }

  getCurrencyData() {
    this.apiCoin.getCurrency()
      .subscribe(res => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDetail(row: any) {
    this.router.navigate(['coinDetail', row.id]);
  }

}
