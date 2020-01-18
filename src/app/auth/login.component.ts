import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { AuthService } from './auth.service';
import { User } from './user';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public error: string;

	user: User = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, 
              private router: Router) { }
  
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(form: NgForm) {
  	console.log('in onsubmit!!!');
    console.log(this.user);

    this.authService.login(this.user)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['/']),
        err => this.error = 'Could not authenticate'
      );
  }
}
