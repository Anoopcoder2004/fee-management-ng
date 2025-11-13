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
  members: Member[] = [];
  paginatedMembers: Member[] = [];

  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  constructor() {
    this.generateDummyData();
    this.updatePaginatedMembers();
  }

  generateDummyData() {
    const plans = ['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly'];
    for (let i = 1; i <= 30; i++) {
      this.members.push({
        id: i,
        name: `Member ${i}`,
        plan: plans[Math.floor(Math.random() * plans.length)],
        joinDate: this.randomDate(),
        status: Math.random() > 0.2 ? 'Active' : 'Inactive',
        feePaid: Math.floor(Math.random() * 5000) + 1000
      });
    }
    this.totalPages = Math.ceil(this.members.length / this.itemsPerPage);
  }

  randomDate() {
    const start = new Date(2023, 0, 1);
    const end = new Date(2025, 0, 1);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
  }

  updatePaginatedMembers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedMembers = this.members.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedMembers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedMembers();
    }
  }
}
