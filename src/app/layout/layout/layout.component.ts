import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { EditProfileComponent } from '../../edit-profile/edit-profile.component';
import { CommonModule } from '@angular/common';
import { Router,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, RouterOutlet, EditProfileComponent,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  title = 'fee-management-ui';
  isSidebarOpen = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isSidebarOpen = false; // ✅ ALWAYS close after navigation
      });
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
    closeSidebar() {
    this.isSidebarOpen = false;
  }

  closeSidebarOnItemClick() {
    this.isSidebarOpen = false;
  }


  isProfileModalOpen = false;

  openProfileModal() {
    this.isProfileModalOpen = true;
  }

  closeProfileModal() {
    this.isProfileModalOpen = false;
  }

}



