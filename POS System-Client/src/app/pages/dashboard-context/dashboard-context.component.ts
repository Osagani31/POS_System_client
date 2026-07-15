import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CookieManagerService } from '../../services/cookie-manager.service';

@Component({
  selector: 'app-dashboard-context',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule
  ],
  templateUrl: './dashboard-context.component.html',
  styleUrl: './dashboard-context.component.scss'
})
export class DashboardContextComponent {
  readonly userEmail = 'test@gmail.com';

  constructor(
    private router: Router,
    private cookieManager: CookieManagerService
  ) {}

  logout(): void {
    this.cookieManager.removeToken('token');
    this.router.navigateByUrl('/login');
  }
}