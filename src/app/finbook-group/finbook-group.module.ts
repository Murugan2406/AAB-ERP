/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter, MatNativeDateModule, MatRippleModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgPrintModule } from 'ng-print';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSortModule } from '@angular/material/sort';
import { MyDateFormat } from '../globals';
import { FinbookGroupRoutingModule } from './finbook-group-routing.module';
import { FinBookComponent } from './fin-book/fin-book.component';
import { VICGroupComponent } from './vicgroup/vicgroup.component';
import { CustOnACCBalanceComponent } from './cust-on-accbalance/cust-on-accbalance.component';
import { HeaderModule } from '../commonComponents/header.module';

@NgModule({
  declarations: [
    FinBookComponent,
    VICGroupComponent,
    CustOnACCBalanceComponent,
  ],
  imports: [
    CommonModule,
    FinbookGroupRoutingModule, MatToolbarModule, MatCardModule,
    MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatIconModule, MatNativeDateModule, ReactiveFormsModule, MatTableModule, FormsModule,
    MatSnackBarModule, NgxSkeletonLoaderModule, MatToolbarModule, Ng2SearchPipeModule,
    MatDialogModule, MatTooltipModule, NgPrintModule, MatRadioModule, MatSelectModule,
    MatRippleModule, MatTabsModule, HeaderModule, MatProgressSpinnerModule, DragDropModule,
    MatCheckboxModule, MatBadgeModule, MatSortModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MyDateFormat },
  ],
})
export class FinbookGroupModule { }
