import { Injectable } from '@angular/core';
import { Product, ProductCategory, ProductStatus } from '../models/product.model';
import productsData from '../data/products.json';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = productsData as Product[];

  getProducts(): Product[] {
    return this.products;
  }

  getCategories(): ProductCategory[] {
    return [...new Set(this.products.map(p => p.category))];
  }

  getStatuses(): ProductStatus[] {
    return [...new Set(this.products.map(p => p.status))];
  }
}
