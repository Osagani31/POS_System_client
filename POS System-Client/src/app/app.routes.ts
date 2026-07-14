import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {NotfoundComponent}  from './pages/notfound/notfound.component';

export const routes: Routes = [
  {path:'', redirectTo: '/login' , pathMatch:'full'},
  {path:'login',component: LoginComponent},
  {path:'**', component:NotfoundComponent},

];
