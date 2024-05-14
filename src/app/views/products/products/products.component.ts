import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {catchError, map, of, retry, Subscription, tap} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService, private http: HttpClient, private router: Router) {
  }

  private subscriptionProduct: Subscription | null = null;
  public products: ProductType[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    this.subscriptionProduct = this.productService.getProducts()
      .pipe(
        tap(()=> {
          this.loading = false;
        })
      )
      .subscribe(
        {
          next: (data) => {
            this.products = data;
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        }
      )
  }

  ngOnDestroy() {
    this.subscriptionProduct?.unsubscribe();
  }
}
