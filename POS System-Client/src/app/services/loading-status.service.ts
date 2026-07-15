import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingStatusService {
  readonly status = new BehaviorSubject<boolean>(false);
  private activeRequests = 0;
  private showScheduled = false;

  beginRequest(): void {
    this.activeRequests += 1;

    if (this.activeRequests === 1 && !this.showScheduled) {
      this.showScheduled = true;

      setTimeout(() => {
        this.showScheduled = false;

        if (this.activeRequests > 0) {
          this.status.next(true);
        }
      });
    }
  }

  endRequest(): void {
    this.activeRequests = Math.max(0, this.activeRequests - 1);

    if (this.activeRequests === 0) {
      this.status.next(false);
    }
  }
}
