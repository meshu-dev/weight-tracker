import { Component } from '@angular/core';

import { UserRepositoryService } from './../core/user-repository.service';

@Component({
  selector: 'app-loading-spinner',
  template: ''
})
export class SignInComponent {
  title = 'loading-spinner';

  constructor(private userRepositoryService: UserRepositoryService) { }
}
