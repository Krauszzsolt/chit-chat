import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule, MatDialogModule, MatProgressSpinnerModule, MatSelectModule, MatToolbarModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { MatDialogWrapperComponent } from './dialog/mat-dialog-wrapper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { SearchComponent } from './component/search/search.component';
import {MatGridListModule} from '@angular/material/grid-list';
@NgModule({
  declarations: [MatDialogWrapperComponent, SpinnerComponent, SearchComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    NgMatSearchBarModule,
    MatCardModule,
    LayoutModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatGridListModule
  ],
  exports: [
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    NgMatSearchBarModule,
    MatCardModule,
    LayoutModule,
    MatDialogModule,
    MatDialogWrapperComponent,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    SpinnerComponent,
    MatGridListModule
  ],
  entryComponents: [MatDialogWrapperComponent],
})
export class SharedModule {}
