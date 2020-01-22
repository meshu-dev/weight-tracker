import { Component, OnInit, OnDestroy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { Subscription } from 'rxjs';

import { MessageService } from './../services/message.service';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit, OnDestroy {
  messages: any[] = [];
  subscription: Subscription;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.subscription = this.messageService
      .getMessage()
      .subscribe(message => {
        if (message) {
          this.messages.push(message);
        } else {
          this.messages = [];
        }
      });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
