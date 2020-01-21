import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
}) 
export class AlertMsgService {
  private message: string;

  setMessage(message: string): void {
    this.message = message;
  }

  getMessage(): string {
    return this.message;
  }

  get msg(): string {
    return this.message;
  }
}
