import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from './product.service';
import { Customer } from './customer.service';

export interface OrderLine {
  product: Product;
  qty: number;
  lineTotal: number;
}

export interface Order {
  _id?: string;
  date: string;
  totalCost: string;
  products: OrderLine[];
  customer: Customer;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  // Adjust this base path to wherever the backend mounts OrderRoute
  // e.g. app.use('/api/order', orderRoute) in index.js
  private readonly baseUrl = `${environment.apiBaseUrl}/order`;

  constructor(private http: HttpClient) {}

  findAllOrders(): Observable<{ message: string; dataList: Order[] }> {
    return this.http.get<{ message: string; dataList: Order[] }>(`${this.baseUrl}/find-all`);
  }

  createOrder(order: Omit<Order, '_id'>): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/create`, order);
  }
}
