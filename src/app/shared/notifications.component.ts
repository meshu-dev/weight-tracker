import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { MessageService } from './../services/message.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit, OnDestroy {
  private static messageLimit = 3;
  public messages: any[] = [];
  private subscription: Subscription;

  constructor(
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.updateMessages();
    this.clearOnRouteChange();
  }

  private updateMessages() {
    this.subscription = this.messageService
      .getMessage()
      .subscribe(message => {
        if (this.messages.length >= NotificationsComponent.messageLimit) {
          this.messages.pop();
        }
        if (message) {
          this.messages.push(message);
        }
      });
  }

  private clearOnRouteChange() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.messages = [];
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
