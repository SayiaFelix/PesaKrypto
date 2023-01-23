import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NavService } from '../service/nav.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChartConfiguration, ChartType } from 'chart.js'
import { BaseChartDirective } from 'ng2-charts';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { NgToastService } from 'ng-angular-popup';
import { Dialog2Component } from '../dialog2/dialog2.component';
import { LoadingService } from '../service/loading.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  loading$ = this.loader.loading$;
  solData: any;
  days: number = 1;
  userData: any;
  productForm!: FormGroup
  sendForm!: FormGroup
  paymentOption=['Send Money','Pay Bill']

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Solana Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#5BC43B',
        pointBackgroundColor: '#5BC43B',
        pointBorderColor: '#5BC43B',
        pointHoverBackgroundColor: '#5BC43B',
        pointHoverBorderColor: '#5BC43B',

      }
    ],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },
    responsive: true,

    plugins: {
      legend: {
        display: true
      },
      title: {
        display: true,
        text: 'Solana Price Trends'
      },
    }

  };
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;

  constructor(
    private formbuilder: FormBuilder,
    private nav: NavService,
    private solApi: ApiService,
    public dialog: MatDialog,
    private toast: NgToastService,
    private api: ApiService,
    private loader: LoadingService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      payment: ['', Validators.required],
      contact: ['', Validators.required],
      paybill: ['', Validators.required],
      accountno: ['', Validators.required],
      price: ['', Validators.required]
    })

    // this.sendForm = this.formbuilder.group({
    //   paybill: ['', Validators.required],
    //   accountno: ['', Validators.required],
    //   price: ['', Validators.required]
    // })
    this.nav.hide();
    this.getSolDetail();
    this.getSolanaGraphData(this.days);
  }
  addProduct() { }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '28%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllProduct();
      }
    })
  }

  openDialog2() {
    this.dialog.open(Dialog2Component, {
      width: '28%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllProduct();
      }
    })
  }
  
  getAllProduct() {
    // this.api.getProduct()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res)
    //     },
    //     error: (err) => {
    //       this.toast.error({ detail: 'ERROR!!!', summary: "Error while recording/fetching the data!!", duration: 5000 })
    //       // alert('error while recording/fetching the data')
    //     }
    //   })

  }

  getUserDetail() {
    this.solApi.getUsers()
      .subscribe(res => {
        this.userData = res;
        console.log(this.userData)
      })
  }

  getSolDetail() {
    this.solApi.getSolanaCurrency()
      .subscribe(res => {
        this.solData = res;
        console.log(this.solData)

      })
  }

  getSolanaGraphData(days: number) {
    this.days = days
    this.solApi.getSolanaDataGraphically(this.days)
      .subscribe(res => {
        setTimeout(() => {
          this.myLineChart.chart?.update();
        }, 100)
        console.log(res)
        this.lineChartData.datasets[0].data = res.prices.map((a: any) => {
          return a[1];
        });
        
        this.lineChartData.labels = res.prices.map((a: any) => {
          let date = new Date(a[0]);
          let time = date.getHours() > 12 ?
            `${date.getHours() - 12}: ${date.getMinutes()} PM` :
            `${date.getHours() - 12}: ${date.getMinutes()} AM`
          return this.days === 1 ? time : date.toLocaleDateString();
        })

      })
  }

}

