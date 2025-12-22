import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']  // ✅ correct property name
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() menuClick = new EventEmitter<void>();

  // Optional: helper method to emit menu click
  onMenuItemClick() {
    this.menuClick.emit();
  }
}
