import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Product {
  _id?: string;
  description: string;
  unitPrice: number;
  qtyOnHand: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  // Adjust this base path to wherever the backend mounts ProductRoute
  // e.g. app.use('/api/product', productRoute) in index.js
  private readonly baseUrl = `${environment.apiBaseUrl}/product`;

  constructor(private http: HttpClient) {}

  loadAllProducts(): Observable<{ message: string; dataList: Product[] }> {
    return this.http.get<{ message: string; dataList: Product[] }>(`${this.baseUrl}/load-all`);
  }

  findProductById(id: string): Observable<{ message: string; data: Product }> {
    return this.http.get<{ message: string; data: Product }>(`${this.baseUrl}/find-by-id/${id}`);
  }

  createProduct(product: Omit<Product, '_id'>): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/create`, product);
  }

  updateProduct(id: string, product: Omit<Product, '_id'>): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.baseUrl}/update/${id}`, product);
  }

  updateProductQty(id: string, qtyOnHand: number): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.baseUrl}/update-qty/${id}`, { qtyOnHand });
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
