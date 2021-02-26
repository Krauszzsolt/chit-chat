import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [LoginComponent, LayoutComponent, RegistrationComponent],
  imports: [CommonModule, CoreRoutingModule, SharedModule]
})
export class CoreModule {}
