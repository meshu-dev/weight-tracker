import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { NotificationType } from './../shared/notification-type';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subject = new Subject<any>();

  sendMessage(message: string) {
    this.subject.next({
      type: NotificationType.Success,
      text: message
    });
  }

  sendError(message: string) {
    this.subject.next({
      type: NotificationType.Danger,
      text: message
    });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
