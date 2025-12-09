import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Member {
  id: number;
  name: string;
  plan: string;
  joinDate: string;
  status: 'Active' | 'Inactive';
  feePaid: number;
}

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent {
 

  constructor() {
  }

 
}
