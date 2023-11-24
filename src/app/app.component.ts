import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'salon-hair';
  showNavbar = true;

  constructor(
    private router: Router,
    private authService: AuthenticationService
    ) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showNavbar = event.urlAfterRedirects !== '/register';
    });
  }

  shouldShowNavbar(): boolean {
    return this.authService.isAuthenticated();
  }
}
