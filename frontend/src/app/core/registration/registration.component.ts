import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterDto } from 'src/app/shared/client';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registerDto: RegisterDto = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  errorMessage: string = undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  registration() {
    this.authService.register(this.registerDto).subscribe(
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
