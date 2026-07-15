import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductService, Product } from '../../services/product.service';
import { CustomerService, Customer } from '../../services/customer.service';
import { OrderService, Order, OrderLine } from '../../services/order.service';

@Component({
  selector: 'app-dashboard-orders-page',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatIconModule, MatProgressSpinnerModule,
    MatSnackBarModule, MatTooltipModule
  ],
  templateUrl: './dashboard-orders-page.component.html',
  styleUrl: './dashboard-orders-page.component.scss'
})
export class DashboardOrdersPageComponent implements OnInit {
  products: Product[] = [];
  customers: Customer[] = [];
  recentOrders: Order[] = [];

  cart: OrderLine[] = [];
  selectedCustomerId: string | null = null;
  productSearch = '';

  isLoadingCatalog = true;
  isPlacingOrder = false;

  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCatalog();
    this.loadCustomers();
    this.loadRecentOrders();
  }

  loadCatalog(): void {
    this.isLoadingCatalog = true;
    this.productService.loadAllProducts().subscribe({
      next: (res) => {
        this.products = res.dataList ?? [];
        this.isLoadingCatalog = false;
      },
      error: () => {
        this.isLoadingCatalog = false;
        this.snackBar.open('Could not load products.', 'Dismiss', { duration: 4000 });
      }
    });
  }

  loadCustomers(): void {
    this.customerService.loadAllCustomers().subscribe({
      next: (res) => (this.customers = res.dataList ?? []),
      error: () => this.snackBar.open('Could not load customers.', 'Dismiss', { duration: 4000 })
    });
  }

  loadRecentOrders(): void {
    this.orderService.findAllOrders().subscribe({
      next: (res) => {
        this.recentOrders = (res.dataList ?? [])
          .slice()
          .reverse()
          .slice(0, 8);
      },
      error: () => { /* non-blocking */ }
    });
  }

  get filteredProducts(): Product[] {
    const q = this.productSearch.trim().toLowerCase();
    if (!q) return this.products;
    return this.products.filter(p => p.description.toLowerCase().includes(q));
  }

  addToCart(product: Product): void {
    if (product.qtyOnHand <= 0) return;
    const existing = this.cart.find(line => line.product._id === product._id);

    if (existing) {
      if (existing.qty >= product.qtyOnHand) return;
      existing.qty += 1;
      existing.lineTotal = existing.qty * existing.product.unitPrice;
    } else {
      this.cart.push({ product, qty: 1, lineTotal: product.unitPrice });
    }
  }

  incrementLine(line: OrderLine): void {
    if (line.qty >= line.product.qtyOnHand) return;
    line.qty += 1;
    line.lineTotal = line.qty * line.product.unitPrice;
  }

  decrementLine(line: OrderLine): void {
    line.qty -= 1;
    if (line.qty <= 0) {
      this.removeLine(line);
      return;
    }
    line.lineTotal = line.qty * line.product.unitPrice;
  }

  removeLine(line: OrderLine): void {
    this.cart = this.cart.filter(l => l !== line);
  }

  get cartTotal(): number {
    return this.cart.reduce((sum, line) => sum + line.lineTotal, 0);
  }

  get selectedCustomer(): Customer | undefined {
    return this.customers.find(c => c._id === this.selectedCustomerId);
  }

  get canPlaceOrder(): boolean {
    return this.cart.length > 0 && !!this.selectedCustomerId && !this.isPlacingOrder;
  }

  placeOrder(): void {
    if (!this.canPlaceOrder || !this.selectedCustomer) return;

    this.isPlacingOrder = true;
    const order: Omit<Order, '_id'> = {
      date: new Date().toISOString(),
      totalCost: this.cartTotal.toFixed(2),
      products: this.cart,
      customer: this.selectedCustomer
    };

    this.orderService.createOrder(order).subscribe({
      next: () => {
        this.isPlacingOrder = false;
        this.snackBar.open('Order placed.', 'Dismiss', { duration: 3000 });
        this.cart = [];
        this.selectedCustomerId = null;
        this.loadCatalog();
        this.loadRecentOrders();
      },
      error: () => {
        this.isPlacingOrder = false;
        this.snackBar.open('Could not place order. Please try again.', 'Dismiss', { duration: 4000 });
      }
    });
  }
}
