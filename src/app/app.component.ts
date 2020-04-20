import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private alertMsg: string;

  constructor(
    public authService: AuthService,
    private messageService: MessageService,
    private router: Router
  )
  { }

  ngOnInit() {
    //this.alertMsg = this.messageService.getMessage();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
