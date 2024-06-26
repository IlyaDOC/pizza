import {Injectable} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: ProductType[] = [];

  constructor(private http: HttpClient) {
  }

  // getProducts():Observable<ProductType[]> {
  //   let params = new HttpParams();
  //   params = params.set('extraField', 1);
  //   return this.http.get<{ data: ProductType[] }>('https://testologia.ru/pizzas', {
  //     observe: 'response',
  //     responseType: 'json', // указываем тип данных, которые нам приходят, но чаще всего он не нужен, так как в большинстве случаев это json
  //     headers: new HttpHeaders({
  //       Authorization: 'auth-token'
  //     }),
  //     params: params
  //   })
  //     .pipe(
  //       tap(result => console.log(result)),
  //       map((result)=> (result.body ? result.body.data : []))
  //     );
  // }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(environment.apiURL + 'pizzas');
  };

  getProduct(id: number): Observable<ProductType> | undefined {
    return this.http.get<ProductType>(environment.apiURL + `pizzas?id=${id}`);
  };

  createOrder(data: { product: string, address: string, phone: string }) {
    return this.http.post<{ success: boolean, message?: string }>(environment.apiURL + '/order-pizza', data);
  }
}
