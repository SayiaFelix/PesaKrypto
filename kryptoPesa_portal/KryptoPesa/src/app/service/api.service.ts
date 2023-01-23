import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService{


  constructor(private http: HttpClient) { }

 
 getUsers() {
    return this.http.get<any>(`http://localhost:3000/users/`)
  }
  getCurrency() {
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false`);
  }
  getCurrencyTrending() {
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
  }
  getCurrencyDataGraphically(coinId: string, days: number) {
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`)
  }
  getCurrencyById(coinId: string) {
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${coinId}`)
  }
  getSolanaCurrency() {
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/solana`)
  }

  getSolanaDataGraphically(days: number) {
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=${days}`)
  }

  postProduct(data: any) {
    return this.http.post<any>("http://localhost:3000/productList/", data);

  }
  getProduct() {
    return this.http.get<any>("http://localhost:3000/productList/");
  }

  putProduct(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/productList/" + id, data);

  }
  deleteProduct(id: number) {
    return this.http.delete<any>("http://localhost:3000/productList/" + id);
  }
}
