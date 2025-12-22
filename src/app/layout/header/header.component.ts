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
  onMenuClick(){
    this.menuClick.emit();
    console.log("hamburger icon clicked")
  }
}
