import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../shared/service/client.service';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

// ✅ Member interface
interface Member {
  id: number;
  name: string;
  phone: string;
  email: string;
  gender: string; // added to fix template error
  plan: string;
  joinDate: string;
  status: 'Active' | 'Inactive';
  feePaid: number;
}

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  tableData: Member[] = [];
  showModal: boolean = false;
  addClientForm: FormGroup;
  submitting: boolean = false;

  // Map plan durations to fees
  planFeeMap: Record<string, number> = {
    '1 Month': 1000,
    '3 Months': 2700,
    '6 Months': 5000
  };

  constructor(private clientService: ClientService, private fb: FormBuilder) {
    // Initialize reactive form
    this.addClientForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', Validators.email],
      gender: ['', Validators.required],
      plan: ['', Validators.required],
      joinDate: [new Date().toISOString().substring(0, 10), Validators.required],
      feePaid: [{ value: 0, disabled: true }, Validators.required], // auto-calculated
      status: ['Active'] // default status
    });
  }

  ngOnInit(): void {
    this.getClientData();

    // Auto-calculate feePaid when plan changes
    this.addClientForm.get('plan')?.valueChanges.subscribe(plan => {
      const fee = this.planFeeMap[plan] || 0;
      this.addClientForm.get('feePaid')?.setValue(fee);
    });
  }

  // Open modal and reset form
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

  // Fetch all clients
  getClientData() {
    this.clientService.getClient().subscribe({
      next: (res: Member[] | any) => { // use any if service not strongly typed
        this.tableData = res;
        console.log('Client data:', this.tableData);
      },
      error: (err) => {
        console.error('Error fetching clients', err);
      }
    });
  }

  // Submit new client
  submitClient() {
    if (this.addClientForm.invalid) return;

    this.submitting = true;

    const clientData: Member = { ...this.addClientForm.getRawValue() }; // feePaid included

    this.clientService.addClient(clientData).subscribe({
      next: (res: Member | any) => { // use any if service not strongly typed
        this.submitting = false;
        this.tableData.push(res); // update table
        this.closeModal();
        this.addClientForm.reset({
          joinDate: new Date().toISOString().substring(0, 10),
          feePaid: 0,
          status: 'Active'
        });
        alert('Client added successfully!');
      },
      error: (err: any) => {
        this.submitting = false;
        console.error('Error adding client', err);
        alert('Failed to add client');
      }
    });
  }
}
