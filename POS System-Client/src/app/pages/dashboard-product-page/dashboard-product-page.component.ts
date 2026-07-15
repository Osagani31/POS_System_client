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
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService, Product } from '../../services/product.service';
import { ProductDialogComponent } from './modal/product-dialog/product-dialog.component';

@Component({
  selector: 'app-dashboard-product-page',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatSortModule, MatPaginatorModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
    MatProgressSpinnerModule, MatTooltipModule, MatDialogModule
  ],
  templateUrl: './dashboard-product-page.component.html',
  styleUrl: './dashboard-product-page.component.scss'
})
export class DashboardProductPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['description', 'unitPrice', 'qtyOnHand', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);
  isLoading = true;

  readonly lowStockThreshold = 10;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  fetchProducts(): void {
    this.isLoading = true;
    this.productService.loadAllProducts().subscribe({
      next: (res) => {
        this.dataSource.data = res.dataList ?? [];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Could not load products. Please try again.', 'Dismiss', { duration: 4000 });
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

  isLowStock(product: Product): boolean {
    return product.qtyOnHand <= this.lowStockThreshold;
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '460px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((created) => {
      if (created) {
        this.snackBar.open('Product created.', 'Dismiss', { duration: 3000 });
        this.fetchProducts();
      }
    });
  }

  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '460px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe((updated) => {
      if (updated) {
        this.snackBar.open('Product updated.', 'Dismiss', { duration: 3000 });
        this.fetchProducts();
      }
    });
  }

  deleteProduct(product: Product): void {
    if (!product._id) return;
    const confirmed = confirm(`Delete "${product.description}"? This can't be undone.`);
    if (!confirmed) return;

    this.productService.deleteProduct(product._id).subscribe({
      next: () => {
        this.snackBar.open('Product deleted.', 'Dismiss', { duration: 3000 });
        this.fetchProducts();
      },
      error: () => {
        this.snackBar.open('Could not delete product.', 'Dismiss', { duration: 4000 });
      }
    });
  }
}
