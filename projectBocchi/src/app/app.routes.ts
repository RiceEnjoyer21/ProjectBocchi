import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { MerchComponent } from './merch/merch.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersticketsComponent } from './userstickets/userstickets.component';
import { MerchListComponent } from './merch-list/merch-list.component';
import { UsersmerchComponent } from './usersmerch/usersmerch.component';
import { MerchDetailComponent } from './merch-detail/merch-detail.component';
import { AuthGuard } from './auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'groups', component: GroupListComponent },
  { path: 'groups/:id', component: GroupDetailComponent },
  { path: 'groups/:id/merch', component: MerchListComponent },
  { path: 'groups/:id/merch/:merchId', component: MerchDetailComponent },
  { path: 'groups/:id/tickets', component: TicketsComponent },
  { path: 'register', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/edit', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'tickets', component: UsersticketsComponent, canActivate: [AuthGuard] },
  { path: 'merch', component: UsersmerchComponent, canActivate: [AuthGuard] },
  { path: 'merch/:id', component: MerchDetailComponent, canActivate: [AuthGuard] },
];
