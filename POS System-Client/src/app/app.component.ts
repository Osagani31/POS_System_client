import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoadingComponent} from './components/loading/loading.component';
import {LoadingStatusService} from './services/loading-status.service';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, NgIf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pos-system-client';
  public statusService:LoadingStatusService = inject(LoadingStatusService);
}
