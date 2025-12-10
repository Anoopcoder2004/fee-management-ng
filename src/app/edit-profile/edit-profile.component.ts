import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
// export class EditProfileComponent {

//   @Input() isOpen = false;
// @Output() close = new EventEmitter<void>();

// closeProfileModal() {
//   this.close.emit();
// }

export class EditProfileComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  closeProfileModal() {
    this.close.emit();
  }

  closeOnOutside(event: MouseEvent) {
  // If the user clicked on the wrapper (overlay), close modal
  this.close.emit();
}

}




