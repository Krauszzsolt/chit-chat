import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/shared/client/model/models';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  loginDto: LoginDto = {
    username: '',
    password: ''
  };

  errorMessage: string = undefined;

  ngOnInit() {}

  login() {
    this.authService.login(this.loginDto).subscribe(
      (resp) => {
        this.router.navigateByUrl('/');
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }
}
