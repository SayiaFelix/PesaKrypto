import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

import { ChartConfiguration, ChartType } from 'chart.js'
import { BaseChartDirective } from 'ng2-charts';
import { LoadingService } from '../service/loading.service';

@Component({
  selector: 'app-krypto-price',
  templateUrl: './krypto-price.component.html',
  styleUrls: ['./krypto-price.component.css']
})
export class KryptoPriceComponent implements OnInit {
  loading$ = this.loader.loading$;
  coinData: any;
  coinId!: string;
  days: number = 1;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
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
      legend: { display: true },
    }
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;

  constructor(private coinApi: ApiService,
    private activateRoute: ActivatedRoute,
    private loader: LoadingService
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(val => {
      this.coinId = val['id'];
    });
    this.getCoinDetail();
    this.getGraphData(this.days);
  }

  getCoinDetail() {
    this.coinApi.getCurrencyById(this.coinId)
      .subscribe(res => {
        this.coinData = res;
        console.log(this.coinData)
      })
  }

  getGraphData(days: number) {
    this.days = days
    this.coinApi.getCurrencyDataGraphically(this.coinId, this.days)
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
