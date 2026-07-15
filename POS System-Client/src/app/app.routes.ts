import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {NotfoundComponent} from './pages/notfound/notfound.component';
import {DashboardContextComponent} from './pages/dashboard-context/dashboard-context.component';
import {DashboardOrdersPageComponent} from './pages/dashboard-orders-page/dashboard-orders-page.component';
import {DashboardProductPageComponent} from './pages/dashboard-product-page/dashboard-product-page.component';
import {DashboardCustomerPageComponent} from './pages/dashboard-customer-page/dashboard-customer-page.component';
import {authGuard} from './guards/auth.guard';
import {SignupComponent} from './pages/signup/signup.component';

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {
    path: 'dashboard', component: DashboardContextComponent, canActivate: [authGuard], children: [
      {path: '', redirectTo: '/dashboard/customers', pathMatch: 'full'},
      {path: 'customers', component: DashboardCustomerPageComponent},
      {path: 'products', component: DashboardProductPageComponent},
      {path: 'orders', component: DashboardOrdersPageComponent},
    ]
  },
  {path: '**', component: NotfoundComponent},
];
