import { Routes } from '@angular/router';
import { MemberComponent } from './modules/member/member.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'members', component: MemberComponent }

];
