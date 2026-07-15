import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../../services/product.service';

export interface ProductDialogData {
  product?: Product;
}

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss'
})
export class ProductDialogComponent {
  productForm: FormGroup;
  isLoading = false;
  isEditMode = false;
  dialogTitle = 'New Product';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogData
  ) {
    this.isEditMode = !!data?.product;
    this.dialogTitle = this.isEditMode ? 'Edit Product' : 'New Product';

    this.productForm = this.fb.group({
      description: [data?.product?.description ?? '', [Validators.required, Validators.minLength(3)]],
      unitPrice: [data?.product?.unitPrice ?? null, [Validators.required, Validators.min(0.01)]],
      qtyOnHand: [data?.product?.qtyOnHand ?? null, [Validators.required, Validators.min(0)]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;
    this.isLoading = true;

    const payload = this.productForm.value;
    const request$ = this.isEditMode && this.data.product
      ? this.productService.updateProduct(this.data.product._id!, payload)
      : this.productService.createProduct(payload);

    request$.subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
