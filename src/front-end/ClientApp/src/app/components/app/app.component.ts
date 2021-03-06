import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuItem } from 'src/app/models/view/menu-item';
import { ToolbarServie } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly _logoutName = 'Log Out';
  private readonly _dashboardTitle = 'My Dashboard';
  private _subscriptions: Subscription[] = [];

  menuItems: MenuItem[] = [
    {
      title: 'Sticker-Board',
      url: '/',
      visible: true,
      right: false,
      icon: undefined,
    },
    {
      title: this._dashboardTitle,
      url: '/my-dashboard',
      visible: true,
      right: false,
      icon: undefined,
    },
    {
      title: 'About',
      url: '/about',
      visible: true,
      right: true,
      icon: 'info',
    },
    {
      title: this._logoutName,
      action: () => this.logout(),
      visible: false,
      right: true,
      icon: 'exit_to_app',
    }
  ];

  constructor(
    private _authService: AuthService,
    private _router: Router,
    public toolbarService: ToolbarServie) {
  }

  private async logout(): Promise<void> {
    this._authService.logout();
    await this._router.navigateByUrl('/');
  }

  ngOnInit(): void {
    this._subscriptions.push(this._authService.isAuthorised$.subscribe(isAuthorised => {
      this.menuItems.find(z => z.title == this._logoutName).visible = isAuthorised;
      this.menuItems.find(z => z.title == this._dashboardTitle).visible = isAuthorised;
    }));

    // not waiting.
    this._authService.isAuthenticated().toPromise();
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(z => z.unsubscribe());
  }
}
