import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { LoginComponent } from './modules/login/login.component';
import { MemberComponent } from './modules/member/member.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'member',component: MemberComponent },
      { path:'coming-soon',component:ComingSoonComponent}

    ]
  },
  { path: 'login', component: LoginComponent } // future layout-free route
];

