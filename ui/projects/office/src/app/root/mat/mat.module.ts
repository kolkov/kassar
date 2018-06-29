import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule, MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule, MatSortModule, MatTableModule, MatToolbarModule
} from "@angular/material";
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  imports: [
    CommonModule,
    /*MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,*/
  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  declarations: []
})
export class MatModule { }
