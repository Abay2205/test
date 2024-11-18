import {Routes} from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {UserFormComponent} from './components/user-form/user-form.component';

export const routes: Routes = [
  {path: 'users', component: UserListComponent},
  { path: 'user-form', component: UserFormComponent },
  { path: 'user-form/:userId', component: UserFormComponent },
  {path: 'user-details/:userId', component: UserDetailsComponent},
  {path: '**', redirectTo: 'users', pathMatch: 'full'},

];
