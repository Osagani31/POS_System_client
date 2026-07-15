import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomerService, Customer } from '../../services/customer.service';
import { CustomerDialogComponent } from './modal/customer-dialog/customer-dialog.component';

@Component({
  selector: 'app-dashboard-customer-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './dashboard-customer-page.component.html',
  styleUrl: './dashboard-customer-page.component.scss'
})
export class DashboardCustomerPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'address', 'salary', 'contact', 'actions'];
  dataSource = new MatTableDataSource<Customer>([]);
  isLoading = true;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  fetchCustomers(): void {
    this.isLoading = true;
    this.customerService.loadAllCustomers().subscribe({
      next: (res) => {
        this.dataSource.data = res.dataList ?? [];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Could not load customers. Please try again.', 'Dismiss', { duration: 4000 });
      }
    });
  }

  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCustomerInitial(customer: Customer): string {
    return customer.name ? customer.name.charAt(0).toUpperCase() : '';
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '460px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((created) => {
      if (created) {
        this.snackBar.open('Customer created.', 'Dismiss', { duration: 3000 });
        this.fetchCustomers();
      }
    });
  }

  openEditDialog(customer: Customer): void {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '460px',
      data: { customer }
    });

    dialogRef.afterClosed().subscribe((updated) => {
      if (updated) {
        this.snackBar.open('Customer updated.', 'Dismiss', { duration: 3000 });
        this.fetchCustomers();
      }
    });
  }

  deleteCustomer(customer: Customer): void {
    if (!customer._id) return;
    const confirmed = confirm(`Delete "${customer.name}"? This can't be undone.`);
    if (!confirmed) return;

    this.customerService.deleteCustomer(customer._id).subscribe({
      next: () => {
        this.snackBar.open('Customer deleted.', 'Dismiss', { duration: 3000 });
        this.fetchCustomers();
      },
      error: () => {
        this.snackBar.open('Could not delete customer.', 'Dismiss', { duration: 4000 });
      }
    });
  }
}