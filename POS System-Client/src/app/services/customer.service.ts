import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Customer {
  _id?: string;
  name: string;
  address: string;
  salary: number;
  contact: string;
}

@Injectable({ providedIn: 'root' })
export class CustomerService {
  // Adjust this base path to wherever the backend mounts CustomerRoute
  // e.g. app.use('/api/customer', customerRoute) in index.js
  private readonly baseUrl = `${environment.apiBaseUrl}/customer`;

  constructor(private http: HttpClient) {}

  loadAllCustomers(): Observable<{ message: string; dataList: Customer[] }> {
    return this.http.get<{ message: string; dataList: Customer[] }>(`${this.baseUrl}/load-all`);
  }

  findCustomerById(id: string): Observable<{ message: string; data: Customer }> {
    return this.http.get<{ message: string; data: Customer }>(`${this.baseUrl}/find-by-id/${id}`);
  }

  createCustomer(customer: Omit<Customer, '_id'>): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/create`, customer);
  }

  updateCustomer(id: string, customer: Omit<Customer, '_id'>): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.baseUrl}/update/${id}`, customer);
  }

  deleteCustomer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
