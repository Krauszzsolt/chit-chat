import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatButtonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatGridListModule,
    InfiniteScrollModule,
    MatIconModule,
    MatButtonToggleModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatRippleModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  exports: [
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    LayoutModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatGridListModule,
    InfiniteScrollModule,
    MatIconModule,
    MatButtonToggleModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatRippleModule,
    MatSnackBarModule,
  ],
})
export class SharedModule {}
