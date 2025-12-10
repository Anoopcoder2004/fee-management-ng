import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {



  @Output() menuClick = new EventEmitter<void>();


    @Output() profileClick = new EventEmitter<void>();

  openProfile() {
    this.profileClick.emit();
  }
//   //open modal on profile click
//   @Output() profileClick = new EventEmitter<void>();

// openProfileModal() {
//   this.profileClick.emit();
// }



  // isProfileModalOpen: boolean = false;
  // openProfileModal() {
  //   this.isProfileModalOpen = true;
  //   console.log("Modal opened");
  // }
  // closeProfileModal(){
  //   this.isProfileModalOpen = false;
  // }
}
