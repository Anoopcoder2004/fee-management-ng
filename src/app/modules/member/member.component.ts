import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ClientService } from '../../shared/service/client.service';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

// ✅ Exported so service can use it
export interface Member {
  id: number;
  name: string;
  phone: string;
  email: string;
  gender: string;
  plan: string;
  joinDate: string;
  status: 'Active' | 'Inactive';
  feePaid: number;
}

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  tableData: Member[] = [];
  showModal: boolean = false;
  submitting: boolean = false;

  // 🔍 Search controls (non-nullable to fix error)
  showNameSearch = false;
  showPhoneSearch = false;

  nameSearchControl = new FormControl<string>('', { nonNullable: true });
  phoneSearchControl = new FormControl<string>('', { nonNullable: true });

  addClientForm: FormGroup;

  planFeeMap: Record<string, number> = {
    '1 Month': 1000,
    '3 Months': 2700,
    '6 Months': 5000
  };

  constructor(private clientService: ClientService, private fb: FormBuilder) {

    this.addClientForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', Validators.email],
      gender: ['', Validators.required],
      plan: ['', Validators.required],
      joinDate: [new Date().toISOString().substring(0, 10), Validators.required],
      feePaid: [{ value: 0, disabled: true }, Validators.required],
      status: ['Active']
    });
  }

  ngOnInit(): void {
    this.getClientData();

    // Auto calculate fee
    this.addClientForm.get('plan')?.valueChanges.subscribe(plan => {
      const fee = this.planFeeMap[plan] || 0;
      this.addClientForm.get('feePaid')?.setValue(fee);
    });

    // 🔍 Name Search
    this.nameSearchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(value => {
        if (!value) {
          return this.clientService.getClient(); // reload full table
        }
        return this.clientService.searchByName(value);
      })
    ).subscribe(res => {
      this.tableData = res;
    });


    // 🔍 Phone Search
    this.phoneSearchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(value => {
        if (!value) {
          return this.clientService.getClient();
        }
        return this.clientService.searchByPhone(value);
      })
    ).subscribe(res => {
      this.tableData = res;
    });

  }

  toggleNameSearch() {
    this.showNameSearch = !this.showNameSearch;
    if (this.showNameSearch) {
      this.showPhoneSearch = false;
      this.phoneSearchControl.setValue('');
    }
  }

  togglePhoneSearch() {
    this.showPhoneSearch = !this.showPhoneSearch;
    if (this.showPhoneSearch) {
      this.showNameSearch = false;
      this.nameSearchControl.setValue('');
    }
  }

  getClientData() {
    this.clientService.getClient().subscribe({
      next: (res) => {
        this.tableData = res;
      },
      error: (err) => {
        console.error('Error fetching clients', err);
      }
    });
  }

  openModal() {
    this.showModal = true;
    this.addClientForm.reset({
      joinDate: new Date().toISOString().substring(0, 10),
      feePaid: 0,
      status: 'Active'
    });
  }

  closeModal() {
    this.showModal = false;
  }

  submitClient() {
    if (this.addClientForm.invalid) return;

    this.submitting = true;

    const clientData: Member = { ...this.addClientForm.getRawValue() };

    this.clientService.addClient(clientData).subscribe({
      next: (res) => {
        this.submitting = false;
        this.tableData.push(res);
        this.closeModal();
      },
      error: (err) => {
        this.submitting = false;
        console.error('Error adding client', err);
      }
    });
  }
}
