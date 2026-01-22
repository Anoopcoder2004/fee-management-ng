import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClientService } from '../../shared/service/client.service';

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

   

  tableData : any = [];


  constructor(private clientservice: ClientService) { }

  ngOnInit():void{
    this.getClientData();
  }

  showModal = false;

  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
  getClientData(){
    this.clientservice.getClient().subscribe({
      next:(res:any) => {
        this.tableData = res;
        console.log('Client data:',this.tableData);
      },
      error:(err) => {
        console.error('Error Fetching clients',err);
      }
    })
  }




}
