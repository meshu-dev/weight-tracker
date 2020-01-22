/*
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent { } */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from './../services/message.service';

@Component({
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit {
	constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.sendMessage();
  }

  sendMessage(): void {
    this.messageService.sendMessage('Message from Home Component to App Component!');
  }
}