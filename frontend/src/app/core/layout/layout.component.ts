import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationUserDto } from 'src/app/shared/client';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private authService: AuthService) {}
  public user: Observable<ApplicationUserDto> = new Observable();
  public showFiller = false;
  public search = '';
  ngOnInit() {
    this.user = this.authService.getUser();
  }

  public searchEvetn() {
    
  }

  public logout() {
    this.authService.logout();
  }
}
