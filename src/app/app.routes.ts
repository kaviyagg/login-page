import { Routes } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginpageComponent
  }
];
