import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { AlertMsgService } from './services/alert-msg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private alertMsg: string;

  constructor(
    private authService: AuthService,
    private alertMsgService: AlertMsgService,
    private router: Router
  )
  { }

  ngOnInit() {
    this.alertMsg = this.alertMsgService.getMessage();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
