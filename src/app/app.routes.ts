import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { MemberComponent } from './modules/member/member.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { authGuard } from './guards/auth.guard'; 
import { SettingsComponent } from './modules/settings/settings.component'; 
import { PaymentComponent } from './modules/payment/payment.component';

export const routes: Routes = [
  // Login route (layout-free)
  { path: 'login', component: LoginComponent },

  // Routes with layout (protected)
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard], // Protect all children
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'member', component: MemberComponent },
      { path: 'coming-soon', component: ComingSoonComponent },
      { path: 'settings',component:SettingsComponent },
      { path: 'payment',component:PaymentComponent}
      
    ]
  },

  // Redirect all unknown routes to login
  { path: '**', redirectTo: 'login' }
];

