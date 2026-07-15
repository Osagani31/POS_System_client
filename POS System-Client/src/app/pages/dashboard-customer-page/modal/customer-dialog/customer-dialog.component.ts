import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Customer, CustomerService } from '../../../../services/customer.service';

export interface CustomerDialogData {
  customer?: Customer;
}

@Component({
  selector: 'app-customer-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './customer-dialog.component.html',
  styleUrl: './customer-dialog.component.scss'
})
export class CustomerDialogComponent {
  customerForm: ReturnType<FormBuilder['group']>;

  isLoading = false;
  isEditMode = false;
  dialogTitle = 'New Customer';

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private dialogRef: MatDialogRef<CustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerDialogData
  ) {
    this.isEditMode = !!data?.customer;
    this.dialogTitle = this.isEditMode ? 'Edit Customer' : 'New Customer';
    this.customerForm = this.formBuilder.group({
      name: [this.data?.customer?.name ?? '', [Validators.required, Validators.minLength(3)]],
      address: [this.data?.customer?.address ?? '', [Validators.required, Validators.minLength(5)]],
      salary: [this.data?.customer?.salary ?? null, [Validators.required, Validators.min(0)]],
      contact: [this.data?.customer?.contact ?? '', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.customerForm.invalid) return;

    this.isLoading = true;
    const payload = this.customerForm.value as Omit<Customer, '_id'>;
    const request$ = this.isEditMode && this.data.customer
      ? this.customerService.updateCustomer(this.data.customer._id!, payload)
      : this.customerService.createCustomer(payload);

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